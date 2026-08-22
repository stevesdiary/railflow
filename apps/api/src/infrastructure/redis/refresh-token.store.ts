import type { Redis } from 'ioredis';
import type { RefreshTokenStore } from '../../modules/identity/auth.types.js';

const KEY_PREFIX = 'rf:';

export class RedisRefreshTokenStore implements RefreshTokenStore {
  constructor(private readonly redis: Redis) {}

  async save(tokenHash: string, userId: string, ttlSeconds: number): Promise<void> {
    await this.redis.set(KEY_PREFIX + tokenHash, userId, 'EX', ttlSeconds);
  }

  async findUserId(tokenHash: string): Promise<string | null> {
    return this.redis.get(KEY_PREFIX + tokenHash);
  }

  async delete(tokenHash: string): Promise<void> {
    await this.redis.del(KEY_PREFIX + tokenHash);
  }
}
