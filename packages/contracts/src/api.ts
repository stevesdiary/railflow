import { z } from 'zod';

export const errorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.unknown()).optional(),
    requestId: z.string().optional(),
  }),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export const healthzResponseSchema = z.object({
  status: z.literal('ok'),
  service: z.string(),
  timestamp: z.string(),
});

export type HealthzResponse = z.infer<typeof healthzResponseSchema>;

export const readinessCheckSchema = z.object({
  name: z.string(),
  status: z.enum(['ok', 'degraded', 'down']),
  latencyMs: z.number().optional(),
});

export type ReadinessCheck = z.infer<typeof readinessCheckSchema>;

export const readyzResponseSchema = z.object({
  status: z.enum(['ready', 'not_ready']),
  service: z.string(),
  timestamp: z.string(),
  checks: z.array(readinessCheckSchema),
});

export type ReadyzResponse = z.infer<typeof readyzResponseSchema>;

export function notFoundResponse(route: string): ErrorResponse {
  return {
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Route not found: ${route}`,
    },
  };
}
