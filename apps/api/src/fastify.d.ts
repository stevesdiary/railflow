import type { Env } from '@railflow/config';
import type { AccessTokenPayload } from './modules/identity/auth.types.js';

declare module 'fastify' {
  interface FastifyInstance {
    config: Env;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: AccessTokenPayload;
    user: AccessTokenPayload;
  }
}

export {};
