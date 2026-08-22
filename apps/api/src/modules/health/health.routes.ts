import type { FastifyInstance } from 'fastify';
import { HealthService, type HealthDependencies } from './health.service.js';

export function registerHealthModule(app: FastifyInstance, deps: HealthDependencies): void {
  const service = new HealthService(deps);

  app.get('/healthz', async () => service.liveness());

  app.get('/readyz', async (_request, reply) => {
    const result = await service.readiness();
    const statusCode = result.status === 'ready' ? 200 : 503;
    return reply.code(statusCode).send(result);
  });
}
