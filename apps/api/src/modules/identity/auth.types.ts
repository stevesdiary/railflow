import type { FastifyBaseLogger } from 'fastify';

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: string;
}

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  emailVerified: boolean;
  createdAt: Date;
}

export interface CreateUserInput {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}

export interface UserRepository {
  create(input: CreateUserInput): Promise<UserRecord>;
  findByEmail(email: string): Promise<UserRecord | null>;
  findById(id: string): Promise<UserRecord | null>;
  markEmailVerified(id: string): Promise<UserRecord>;
}

export interface RefreshTokenStore {
  save(tokenHash: string, userId: string, ttlSeconds: number): Promise<void>;
  findUserId(tokenHash: string): Promise<string | null>;
  delete(tokenHash: string): Promise<void>;
}

export interface VerificationTokenRecord {
  id: string;
  tokenHash: string;
  userId: string;
  expiresAt: Date;
  usedAt: Date | null;
  createdAt: Date;
}

export interface VerificationTokenStore {
  create(input: { tokenHash: string; userId: string; expiresAt: Date }): Promise<void>;
  findByHash(tokenHash: string): Promise<VerificationTokenRecord | null>;
  markUsed(id: string): Promise<boolean>;
}

export interface TokenService {
  signAccessToken(payload: AccessTokenPayload): string;
  verifyAccessToken(token: string): AccessTokenPayload;
}

export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
}

export interface Mailer {
  send(message: EmailMessage): Promise<void>;
}

export interface AuthDependencies {
  userRepository: UserRepository;
  refreshTokenStore: RefreshTokenStore;
  verificationTokenStore: VerificationTokenStore;
  tokenService: TokenService;
  mailer: Mailer;
  logger: FastifyBaseLogger;
  accessTokenTtlSeconds: number;
  refreshTokenTtlSeconds: number;
  verificationTokenTtlSeconds: number;
  publicBaseUrl: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    status: user.status,
    emailVerified: user.emailVerifiedAt !== null,
    createdAt: user.createdAt,
  };
}
