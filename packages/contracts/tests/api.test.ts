import { describe, expect, it } from 'vitest';
import {
  errorResponseSchema,
  healthzResponseSchema,
  notFoundResponse,
  readyzResponseSchema,
} from '../src/index.js';

describe('api contracts', () => {
  it('validates error responses', () => {
    const response = {
      error: { code: 'NOT_FOUND', message: 'Resource not found', requestId: 'req-1' },
    };
    expect(errorResponseSchema.safeParse(response).success).toBe(true);
  });

  it('rejects error responses without a code', () => {
    const response = { error: { message: 'oops' } };
    expect(errorResponseSchema.safeParse(response).success).toBe(false);
  });

  it('validates liveness responses', () => {
    const response = {
      status: 'ok',
      service: 'railflow-api',
      timestamp: '2026-08-08T00:00:00.000Z',
    };
    expect(healthzResponseSchema.safeParse(response).success).toBe(true);
  });

  it('validates readiness responses with checks', () => {
    const response = {
      status: 'ready',
      service: 'railflow-api',
      timestamp: '2026-08-08T00:00:00.000Z',
      checks: [{ name: 'database', status: 'ok', latencyMs: 2 }],
    };
    expect(readyzResponseSchema.safeParse(response).success).toBe(true);
  });

  it('builds a standard not-found response', () => {
    expect(notFoundResponse('/api/nope')).toEqual({
      error: { code: 'ROUTE_NOT_FOUND', message: 'Route not found: /api/nope' },
    });
  });
});
