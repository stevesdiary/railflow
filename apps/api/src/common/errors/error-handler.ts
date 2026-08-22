import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import type { ErrorResponse } from '@railflow/contracts';
import { AppError, type ErrorCode } from './app-error.js';

export interface ErrorHandlerOptions {
  exposeStackInDev?: boolean;
}

function toErrorResponse(error: AppError, request: FastifyRequest): ErrorResponse {
  return {
    error: {
      code: error.code,
      message: error.message,
      details: error.details,
      requestId: request.id,
    },
  };
}

export function registerErrorHandler(
  app: FastifyInstance,
  options: ErrorHandlerOptions = {},
): void {
  const exposeStack = options.exposeStackInDev ?? app.config.NODE_ENV === 'development';

  app.setErrorHandler((error, request, reply) => {
    const requestId = request.id;

    if (error instanceof AppError) {
      if (!error.expose) {
        request.log.error({ err: error, requestId }, 'Unhandled application error');
      }
      void reply.code(error.statusCode).send(toErrorResponse(error, request));
      return;
    }

    const validationError = error as {
      validation?: Array<{ instancePath?: string; keyword?: string; message?: string }>;
      validationContext?: string;
    };

    if (validationError.validation) {
      const details = {
        context: validationError.validationContext,
        issues: validationError.validation.map((issue) => ({
          path: issue.instancePath ?? '',
          message: issue.message ?? 'invalid value',
        })),
      };
      const response: ErrorResponse = {
        error: {
          code: 'VALIDATION_ERROR' as ErrorCode,
          message: 'Request validation failed',
          details,
          requestId,
        },
      };
      void reply.code(400).send(response);
      return;
    }

    request.log.error({ err: error, requestId }, 'Unhandled error');

    const response: ErrorResponse = {
      error: {
        code: 'INTERNAL_ERROR' as ErrorCode,
        message: 'Internal server error',
        ...(exposeStack ? { details: { stack: (error as Error).stack } } : {}),
        requestId,
      },
    };
    void reply.code(500).send(response);
  });

  app.setNotFoundHandler((request, reply) => {
    const response: ErrorResponse = {
      error: {
        code: 'ROUTE_NOT_FOUND' as ErrorCode,
        message: `Route not found: ${request.method} ${request.url}`,
        requestId: request.id,
      },
    };
    void reply.code(404).send(response);
  });
}

export type { FastifyReply };
