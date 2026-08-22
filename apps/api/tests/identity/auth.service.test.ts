import { describe, expect, it } from 'vitest';
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '../../src/common/errors/app-error.js';
import { AuthService } from '../../src/modules/identity/auth.service.js';
import { hashPassword } from '../../src/modules/identity/password.js';
import { MemoryAuthInfra } from '../helpers.js';

const lightArgon = { memoryCost: 16_384, timeCost: 2, parallelism: 1 };

async function registerUser(infra: MemoryAuthInfra) {
  const service = new AuthService(infra.deps());
  return service.register({
    email: 'ada@example.com',
    password: 'password123',
    firstName: 'Ada',
    lastName: 'Lovelace',
  });
}

describe('AuthService.register', () => {
  it('creates a pending user and sends a verification email', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());

    const { user } = await service.register({
      email: 'Ada@Example.com',
      password: 'password123',
      firstName: 'Ada',
      lastName: 'Lovelace',
    });

    expect(user.email).toBe('ada@example.com');
    expect(user.status).toBe('PENDING_VERIFICATION');
    expect(user.emailVerified).toBe(false);
    expect(JSON.stringify(user)).not.toContain('passwordHash');

    const stored = [...infra.users.values()][0];
    expect(stored).toBeDefined();
    expect(stored!.passwordHash).toMatch(/^\$argon2id\$/);
    expect(infra.verificationTokens.size).toBe(1);
    expect(infra.mail).toHaveLength(1);
    const message = infra.mail[0];
    expect(message?.to).toBe('ada@example.com');
    expect(message?.text).toContain('/auth/verify-email?token=');
    expect(message?.text).toContain('http://localhost:3000');
  });

  it('rejects duplicate emails', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());
    await registerUser(infra);

    await expect(
      service.register({
        email: 'ada@example.com',
        password: 'password123',
        firstName: 'Ada',
        lastName: 'Lovelace',
      }),
    ).rejects.toBeInstanceOf(ConflictError);
  });
});

describe('AuthService.login', () => {
  async function seedActiveUser(infra: MemoryAuthInfra) {
    const passwordHash = await hashPassword('password123', lightArgon);
    const user = infra.addUser({ email: 'ada@example.com', passwordHash, status: 'ACTIVE' });
    return user;
  }

  it('issues access and refresh tokens for valid credentials', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());
    const user = await seedActiveUser(infra);

    const result = await service.login({ email: 'ada@example.com', password: 'password123' });

    expect(result.accessToken).toContain('.');
    expect(result.refreshToken).toBeTruthy();
    expect(result.expiresIn).toBe(900);
    expect(result.user.id).toBe(user.id);
    expect(infra.refreshTokens.size).toBe(1);
  });

  it('rejects an unknown email', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());

    await expect(
      service.login({ email: 'nobody@example.com', password: 'password123' }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('rejects a wrong password', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());
    await seedActiveUser(infra);

    await expect(
      service.login({ email: 'ada@example.com', password: 'wrong-password' }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('blocks login for unverified accounts', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());
    const passwordHash = await hashPassword('password123', lightArgon);
    infra.addUser({ email: 'ada@example.com', passwordHash, status: 'PENDING_VERIFICATION' });

    await expect(
      service.login({ email: 'ada@example.com', password: 'password123' }),
    ).rejects.toBeInstanceOf(ForbiddenError);
  });
});

describe('AuthService.refresh', () => {
  it('rotates the refresh token and issues a new access token', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());
    const passwordHash = await hashPassword('password123', lightArgon);
    const user = infra.addUser({ email: 'ada@example.com', passwordHash, status: 'ACTIVE' });

    const first = await service.login({ email: 'ada@example.com', password: 'password123' });
    const refreshed = await service.refresh({ refreshToken: first.refreshToken });

    expect(refreshed.accessToken).toBeTruthy();
    expect(refreshed.refreshToken).not.toBe(first.refreshToken);
    expect(refreshed.user.id).toBe(user.id);
    expect(infra.refreshTokens.size).toBe(1);
  });

  it('rejects an unknown refresh token', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());

    await expect(service.refresh({ refreshToken: 'bogus' })).rejects.toBeInstanceOf(
      UnauthorizedError,
    );
  });
});

describe('AuthService.logout', () => {
  it('revokes the refresh token so refresh no longer works', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());
    const passwordHash = await hashPassword('password123', lightArgon);
    infra.addUser({ email: 'ada@example.com', passwordHash, status: 'ACTIVE' });

    const login = await service.login({ email: 'ada@example.com', password: 'password123' });
    await service.logout({ refreshToken: login.refreshToken });

    expect(infra.refreshTokens.size).toBe(0);
    await expect(service.refresh({ refreshToken: login.refreshToken })).rejects.toBeInstanceOf(
      UnauthorizedError,
    );
  });
});

describe('AuthService.verifyEmail', () => {
  function rawTokenFromMail(infra: MemoryAuthInfra): string {
    const message = infra.mail[0];
    const match = /token=([^\s]+)/.exec(message?.text ?? '');
    if (!match?.[1]) {
      throw new Error('no token found in mail');
    }
    return match[1];
  }

  it('verifies the email and activates the account', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());
    const { user } = await registerUser(infra);

    const result = await service.verifyEmail({ token: rawTokenFromMail(infra) });

    const updated = infra.users.get(user.id);
    expect(result.verified).toBe(true);
    expect(updated?.status).toBe('ACTIVE');
    expect(updated?.emailVerifiedAt).not.toBeNull();
  });

  it('rejects an unknown token', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());

    await expect(service.verifyEmail({ token: 'nope' })).rejects.toBeInstanceOf(BadRequestError);
  });

  it('rejects an expired token', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());
    const { user } = await registerUser(infra);
    infra.seedVerificationToken('expired-raw', user.id, new Date(Date.now() - 1000));

    await expect(service.verifyEmail({ token: 'expired-raw' })).rejects.toBeInstanceOf(
      BadRequestError,
    );
  });

  it('rejects a token used twice', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());
    const { user } = await registerUser(infra);
    infra.seedVerificationToken('single-use', user.id);

    await expect(service.verifyEmail({ token: 'single-use' })).resolves.toMatchObject({
      verified: true,
    });
    await expect(service.verifyEmail({ token: 'single-use' })).rejects.toBeInstanceOf(
      BadRequestError,
    );
  });
});

describe('AuthService.getProfile', () => {
  it('returns the public profile of an existing user', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());
    const user = infra.addUser({ email: 'ada@example.com' });

    const profile = await service.getProfile(user.id);

    expect(profile.id).toBe(user.id);
    expect(profile.email).toBe('ada@example.com');
    expect(JSON.stringify(profile)).not.toContain('passwordHash');
  });

  it('throws when the user does not exist', async () => {
    const infra = new MemoryAuthInfra();
    const service = new AuthService(infra.deps());

    await expect(service.getProfile('missing')).rejects.toBeInstanceOf(NotFoundError);
  });
});
