import { createHash, randomBytes } from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import type {
  AccessTokenPayload,
  RefreshTokenStore,
  TokenService,
  VerificationTokenRecord,
  VerificationTokenStore,
} from './auth.types.js';

export function hashToken(rawToken: string): string {
  return createHash('sha256').update(rawToken).digest('hex');
}

export class FastifyJwtTokenService implements TokenService {
  constructor(
    private readonly app: FastifyInstance,
    private readonly ttl: string,
  ) {}

  signAccessToken(payload: AccessTokenPayload): string {
    return this.app.jwt.sign(payload, { expiresIn: this.ttl });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    return this.app.jwt.verify<AccessTokenPayload>(token);
  }
}

export class RefreshTokenService {
  constructor(
    private readonly store: RefreshTokenStore,
    private readonly ttlSeconds: number,
  ) {}

  async issue(userId: string): Promise<string> {
    const raw = randomBytes(48).toString('base64url');
    await this.store.save(hashToken(raw), userId, this.ttlSeconds);
    return raw;
  }

  async lookup(rawToken: string): Promise<string | null> {
    return this.store.findUserId(hashToken(rawToken));
  }

  async revoke(rawToken: string): Promise<void> {
    await this.store.delete(hashToken(rawToken));
  }
}

export class VerificationTokenService {
  constructor(
    private readonly store: VerificationTokenStore,
    private readonly ttlSeconds: number,
  ) {}

  async issue(userId: string): Promise<{ rawToken: string; expiresAt: Date }> {
    const raw = randomBytes(32).toString('base64url');
    const expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    await this.store.create({ tokenHash: hashToken(raw), userId, expiresAt });
    return { rawToken: raw, expiresAt };
  }

  find(rawToken: string): Promise<VerificationTokenRecord | null> {
    return this.store.findByHash(hashToken(rawToken));
  }
}
