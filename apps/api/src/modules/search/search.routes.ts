import type { FastifyInstance } from 'fastify';
import { getPrisma } from '../../infrastructure/prisma/prisma.js';
import { PrismaSearchRepository } from '../../infrastructure/prisma/search-repositories.js';
import { RedisSearchCache } from '../../infrastructure/redis/search-cache.js';
import type { SearchCache, SearchRepository } from './search.types.js';
import { SearchService } from './search.service.js';

export function buildDefaultSearchRepository(): SearchRepository {
  return new PrismaSearchRepository(getPrisma());
}

export function buildDefaultSearchCache(): SearchCache {
  return new RedisSearchCache();
}

export function registerSearchModule(
  app: FastifyInstance,
  repository: SearchRepository,
  cache?: SearchCache,
  cacheTtlSeconds?: number,
): void {
  const service = new SearchService(repository, cache, cacheTtlSeconds);

  app.get('/search', async (request) => {
    const query = request.query as {
      from?: string;
      to?: string;
      date?: string;
      class?: string;
    };
    const result = await service.searchJourneys(
      query.from ?? '',
      query.to ?? '',
      query.date ?? '',
      query.class,
    );
    return result;
  });
}
