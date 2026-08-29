import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { getPrisma } from '../../infrastructure/prisma/prisma.js';
import { PrismaRailwayRepository } from '../../infrastructure/prisma/railway-repositories.js';
import type { RailwayRepository } from './railway.types.js';
import { RailwayService } from './railway.service.js';

const stationsQuerySchema = z.object({
  query: z.string().trim().max(50).optional(),
});

const faresQuerySchema = z.object({
  from: z.string().trim().max(10).optional(),
  to: z.string().trim().max(10).optional(),
  class: z.string().trim().max(10).optional(),
});

export function buildDefaultRailwayRepository(): RailwayRepository {
  return new PrismaRailwayRepository(getPrisma());
}

export function registerRailwayModule(app: FastifyInstance, repository: RailwayRepository): void {
  const service = new RailwayService(repository);

  app.get('/stations', async (request) => {
    const query = stationsQuerySchema.safeParse(request.query);
    const stations = await service.listStations(query.success ? query.data.query : undefined);
    return { stations };
  });

  app.get('/stations/:code', async (request) => {
    const { code } = request.params as { code: string };
    const station = await service.getStationByCode(code);
    return { station };
  });

  app.get('/trains', async () => {
    const trains = await service.listTrains();
    return { trains };
  });

  app.get('/trains/:number', async (request) => {
    const { number } = request.params as { number: string };
    const train = await service.getTrainByNumber(number);
    return { train };
  });

  app.get('/classes', async () => {
    const classes = await service.listClasses();
    return { classes };
  });

  app.get('/quotas', async () => {
    const quotas = await service.listQuotas();
    return { quotas };
  });

  app.get('/fares', async (request) => {
    const query = faresQuerySchema.safeParse(request.query);
    const params = query.success ? query.data : {};
    const fares = await service.listFares(params.from, params.to, params.class);
    return { fares };
  });
}
