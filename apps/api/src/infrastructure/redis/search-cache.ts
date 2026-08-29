import type { PublicSearchResult, SearchCache } from '../../modules/search/search.types.js';
import { getRedis } from './redis.js';

const KEY_PREFIX = 'railflow:search:';
const MAX_TTL_SECONDS = 86_400;

export class RedisSearchCache implements SearchCache {
  async get(key: string): Promise<PublicSearchResult | null> {
    try {
      const raw = await getRedis().get(KEY_PREFIX + key);
      if (!raw) {
        return null;
      }
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || !('journeys' in parsed)) {
        return null;
      }
      return parsed as PublicSearchResult;
    } catch (error) {
      console.error('Search cache get failed', error);
      return null;
    }
  }

  async set(key: string, value: PublicSearchResult, ttlSeconds: number): Promise<void> {
    try {
      await getRedis().set(
        KEY_PREFIX + key,
        JSON.stringify(value),
        'EX',
        Math.min(Math.max(1, ttlSeconds), MAX_TTL_SECONDS),
      );
    } catch (error) {
      console.error('Search cache set failed', error);
    }
  }
}
