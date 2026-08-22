import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../common/auth/require-auth.js';
import { getPrisma } from '../../infrastructure/prisma/prisma.js';
import { PrismaInventoryRepository } from '../../infrastructure/prisma/inventory-repositories.js';
import type { InventoryRepository } from './inventory.types.js';
import { InventoryService } from './inventory.service.js';

export function buildDefaultInventoryRepository(): InventoryRepository {
  return new PrismaInventoryRepository(getPrisma());
}

export function registerInventoryModule(
  app: FastifyInstance,
  repository: InventoryRepository,
  defaultHoldTtlSeconds: number,
): void {
  const service = new InventoryService(repository, defaultHoldTtlSeconds);

  app.get('/journeys/:journeyId/availability', async (request) => {
    const params = request.params as { journeyId: string };
    const query = request.query as { class?: string };
    return service.getAvailability(params.journeyId, query.class);
  });

  app.get('/journeys/:journeyId/seats', async (request) => {
    const params = request.params as { journeyId: string };
    return service.getSeatMap(params.journeyId);
  });

  app.post('/inventory/holds', { preHandler: authenticate }, async (request) => {
    const body = request.body as {
      journeyId?: string;
      classCode?: string;
      count?: number;
      preferredSeatNumbers?: string[];
    };
    const result = await service.holdSeats(
      {
        journeyId: body.journeyId ?? '',
        classCode: body.classCode ?? '',
        count: body.count ?? 0,
        preferredSeatNumbers: body.preferredSeatNumbers,
      },
      undefined,
    );
    return { heldSeats: result.heldSeats, expiresAt: result.expiresAt };
  });

  app.post('/inventory/holds/release', { preHandler: authenticate }, async (request) => {
    const body = request.body as { holdIds?: string[] };
    const released = await service.releaseHolds(body.holdIds ?? []);
    return { released };
  });
}
