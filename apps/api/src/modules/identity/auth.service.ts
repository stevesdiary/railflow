import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '../../common/errors/app-error.js';
import type { AuthDependencies, AuthTokens, PublicUser, UserRecord } from './auth.types.js';
import { toPublicUser } from './auth.types.js';
import { hashPassword, verifyPassword } from './password.js';
import { RefreshTokenService, VerificationTokenService } from './tokens.js';

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CredentialInput {
  refreshToken: string;
}

export class AuthService {
  private readonly refreshTokens: RefreshTokenService;
  private readonly verificationTokens: VerificationTokenService;

  constructor(private readonly deps: AuthDependencies) {
    this.refreshTokens = new RefreshTokenService(
      deps.refreshTokenStore,
      deps.refreshTokenTtlSeconds,
    );
    this.verificationTokens = new VerificationTokenService(
      deps.verificationTokenStore,
      deps.verificationTokenTtlSeconds,
    );
  }

  async register(input: RegisterInput): Promise<{ user: PublicUser }> {
    const email = input.email.toLowerCase();
    const existing = await this.deps.userRepository.findByEmail(email);
    if (existing) {
      throw new ConflictError('An account with this email already exists');
    }

    const passwordHash = await hashPassword(input.password);
    const user = await this.deps.userRepository.create({
      email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
    });

    const { rawToken } = await this.verificationTokens.issue(user.id);
    const verificationUrl = `${this.deps.publicBaseUrl}/auth/verify-email?token=${rawToken}`;

    await this.deps.mailer.send({
      to: email,
      subject: 'Verify your RailFlow account',
      text: `Welcome to RailFlow! Verify your email address by opening:\n\n${verificationUrl}\n\nThis link expires in ${this.deps.verificationTokenTtlSeconds / 3600} hours.`,
    });

    this.deps.logger.info({ userId: user.id, email }, 'User registered');

    return { user: toPublicUser(user) };
  }

  async login(input: LoginInput): Promise<AuthTokens & { user: PublicUser }> {
    const user = await this.deps.userRepository.findByEmail(input.email.toLowerCase());

    if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
      throw new UnauthorizedError('Invalid email or password');
    }

    this.assertActive(user);

    const tokens = await this.issueTokens(user.id);

    this.deps.logger.info({ userId: user.id, email: user.email }, 'User logged in');

    return { ...tokens, user: toPublicUser(user) };
  }

  async refresh(input: CredentialInput): Promise<AuthTokens & { user: PublicUser }> {
    const userId = await this.refreshTokens.lookup(input.refreshToken);
    if (!userId) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const user = await this.deps.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    this.assertActive(user);

    await this.refreshTokens.revoke(input.refreshToken);
    const tokens = await this.issueTokens(user.id);

    return { ...tokens, user: toPublicUser(user) };
  }

  async logout(input: CredentialInput): Promise<void> {
    await this.refreshTokens.revoke(input.refreshToken);
  }

  async verifyEmail(input: { token: string }): Promise<{ email: string; verified: boolean }> {
    const record = await this.verificationTokens.find(input.token);

    if (!record || record.usedAt !== null) {
      throw new BadRequestError('Invalid or already-used verification link');
    }

    if (record.expiresAt.getTime() < Date.now()) {
      throw new BadRequestError('Verification link has expired');
    }

    const used = await this.deps.verificationTokenStore.markUsed(record.id);
    if (!used) {
      throw new BadRequestError('Invalid or already-used verification link');
    }

    const user = await this.deps.userRepository.markEmailVerified(record.userId);

    this.deps.logger.info({ userId: user.id, email: user.email }, 'Email verified');

    return { email: user.email, verified: true };
  }

  async getProfile(userId: string): Promise<PublicUser> {
    const user = await this.deps.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return toPublicUser(user);
  }

  private assertActive(user: UserRecord): void {
    if (user.status !== 'ACTIVE') {
      if (user.status === 'PENDING_VERIFICATION') {
        throw new ForbiddenError('Email verification required');
      }
      throw new ForbiddenError('Account is not active');
    }
  }

  private async issueTokens(userId: string): Promise<AuthTokens> {
    const user = await this.deps.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('Account not found');
    }

    const accessToken = this.deps.tokenService.signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = await this.refreshTokens.issue(user.id);

    return {
      accessToken,
      refreshToken,
      expiresIn: this.deps.accessTokenTtlSeconds,
    };
  }
}
