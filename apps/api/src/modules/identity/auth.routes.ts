import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { ZodType } from 'zod';
import { parseDuration, type Env } from '@railflow/config';
import { ValidationError } from '../../common/errors/app-error.js';
import { authenticate } from '../../common/auth/require-auth.js';
import { getPrisma } from '../../infrastructure/prisma/prisma.js';
import {
  PrismaUserRepository,
  PrismaVerificationTokenStore,
} from '../../infrastructure/prisma/identity-repositories.js';
import { getRedis } from '../../infrastructure/redis/redis.js';
import { RedisRefreshTokenStore } from '../../infrastructure/redis/refresh-token.store.js';
import { DevMailer } from '../../infrastructure/mailer/dev-mailer.js';
import type { AuthDependencies } from './auth.types.js';
import { AuthService } from './auth.service.js';
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  verifyEmailQuerySchema,
} from './auth.schemas.js';
import { FastifyJwtTokenService } from './tokens.js';

export function buildDefaultAuthDeps(app: FastifyInstance, config: Env): AuthDependencies {
  return {
    userRepository: new PrismaUserRepository(getPrisma()),
    refreshTokenStore: new RedisRefreshTokenStore(getRedis()),
    verificationTokenStore: new PrismaVerificationTokenStore(getPrisma()),
    tokenService: new FastifyJwtTokenService(app, config.JWT_ACCESS_TTL),
    mailer: new DevMailer(app.log),
    logger: app.log,
    accessTokenTtlSeconds: parseDuration(config.JWT_ACCESS_TTL),
    refreshTokenTtlSeconds: parseDuration(config.JWT_REFRESH_TTL),
    verificationTokenTtlSeconds: parseDuration(config.EMAIL_VERIFICATION_TOKEN_TTL),
    publicBaseUrl: config.PUBLIC_BASE_URL,
  };
}

function parseOrThrow<T>(schema: ZodType<T>, value: unknown): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new ValidationError('Request validation failed', {
      issues: result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }
  return result.data;
}

export function registerIdentityModule(app: FastifyInstance, deps: AuthDependencies): void {
  const service = new AuthService(deps);

  app.post('/auth/register', async (request, reply) => {
    const input = parseOrThrow(registerSchema, request.body);
    const { user } = await service.register(input);
    return reply.code(201).send({ user });
  });

  app.post('/auth/login', async (request, reply) => {
    const input = parseOrThrow(loginSchema, request.body);
    const result = await service.login(input);
    return reply.send(result);
  });

  app.post('/auth/refresh', async (request, reply) => {
    const input = parseOrThrow(refreshTokenSchema, request.body);
    const result = await service.refresh(input);
    return reply.send(result);
  });

  app.post('/auth/logout', async (request, reply) => {
    const input = parseOrThrow(refreshTokenSchema, request.body);
    await service.logout(input);
    return reply.code(204).send();
  });

  app.get('/auth/verify-email', async (request: FastifyRequest) => {
    const query = parseOrThrow(verifyEmailQuerySchema, request.query);
    const result = await service.verifyEmail(query);
    return result;
  });

  app.get('/auth/me', { preHandler: authenticate }, async (request, reply) => {
    const profile = await service.getProfile(request.user.sub);
    return reply.send({ user: profile });
  });
}
