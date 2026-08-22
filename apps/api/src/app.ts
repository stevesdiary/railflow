import { randomUUID } from 'node:crypto';
import Fastify, { LogController, type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import { parseDuration, type Env } from '@railflow/config';
import { createLoggerOptions, type LogLevel } from '@railflow/logger';
import { registerErrorHandler } from './common/errors/error-handler.js';
import { registerHealthModule } from './modules/health/health.routes.js';
import { checkDatabaseConnection, closePrisma } from './infrastructure/prisma/prisma.js';
import { closeRedis } from './infrastructure/redis/redis.js';
import { buildDefaultAuthDeps, registerIdentityModule } from './modules/identity/auth.routes.js';
import type { AuthDependencies } from './modules/identity/auth.types.js';
import type { RailwayRepository } from './modules/railway/railway.types.js';
import {
  buildDefaultRailwayRepository,
  registerRailwayModule,
} from './modules/railway/railway.routes.js';
import type { SearchCache, SearchRepository } from './modules/search/search.types.js';
import {
  buildDefaultSearchCache,
  buildDefaultSearchRepository,
  registerSearchModule,
} from './modules/search/search.routes.js';
import type { InventoryRepository } from './modules/inventory/inventory.types.js';
import {
  buildDefaultInventoryRepository,
  registerInventoryModule,
} from './modules/inventory/inventory.routes.js';
import type { BookingRepository } from './modules/booking/booking.types.js';
import {
  buildDefaultBookingRepository,
  registerBookingModule,
} from './modules/booking/booking.routes.js';

export interface BuildAppOptions {
  config: Env;
  loggerLevel?: LogLevel;
  checkDatabase?: () => Promise<boolean>;
  identity?: AuthDependencies | ((app: FastifyInstance) => AuthDependencies);
  railway?: { repository?: RailwayRepository };
  search?: { repository?: SearchRepository; cache?: SearchCache; cacheTtlSeconds?: number };
  inventory?: { repository?: InventoryRepository; holdTtlSeconds?: number };
  booking?: { repository?: BookingRepository; holdTtlSeconds?: number };
}

export function buildApp(options: BuildAppOptions): FastifyInstance {
  const { config } = options;

  const app = Fastify({
    logger: createLoggerOptions({
      name: 'railflow-api',
      level: options.loggerLevel ?? config.LOG_LEVEL,
      redactPaths: config.LOG_REDACT_PATHS,
      pretty: config.NODE_ENV === 'development' && process.stdout.isTTY,
    }),
    genReqId: () => randomUUID(),
    requestIdHeader: 'x-request-id',
    logController: new LogController({ requestIdLogLabel: 'requestId' }),
    bodyLimit: 1_048_576,
    connectionTimeout: config.API_REQUEST_TIMEOUT_MS,
  });

  app.decorate('config', config);

  app.addHook('onClose', async () => {
    await closePrisma();
    await closeRedis();
  });

  void app.register(cors, {
    origin: config.CORS_ORIGIN === '*' ? true : config.CORS_ORIGIN.split(',').map((s) => s.trim()),
  });

  registerErrorHandler(app, { exposeStackInDev: config.NODE_ENV === 'development' });

  void app.register(fastifyJwt, {
    secret: config.JWT_ACCESS_SECRET,
    sign: { expiresIn: config.JWT_ACCESS_TTL },
  });

  void app.register(registerHealthModule, {
    serviceName: 'railflow-api',
    checkDatabase: options.checkDatabase ?? checkDatabaseConnection,
  });

  const identityDeps =
    typeof options.identity === 'function'
      ? options.identity(app)
      : (options.identity ?? buildDefaultAuthDeps(app, config));

  registerIdentityModule(app, identityDeps);

  registerRailwayModule(app, options.railway?.repository ?? buildDefaultRailwayRepository());

  registerSearchModule(
    app,
    options.search?.repository ?? buildDefaultSearchRepository(),
    options.search?.cache ?? buildDefaultSearchCache(),
    options.search?.cacheTtlSeconds ?? parseDuration(config.SEARCH_CACHE_TTL),
  );

  registerInventoryModule(
    app,
    options.inventory?.repository ?? buildDefaultInventoryRepository(),
    options.inventory?.holdTtlSeconds ?? parseDuration(config.SEAT_HOLD_TTL),
  );

  registerBookingModule(
    app,
    options.booking?.repository ?? buildDefaultBookingRepository(),
    options.booking?.holdTtlSeconds ??
      options.inventory?.holdTtlSeconds ??
      parseDuration(config.SEAT_HOLD_TTL),
  );

  return app;
}
