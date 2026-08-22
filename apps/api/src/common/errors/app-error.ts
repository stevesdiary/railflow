export type ErrorCode =
  | 'INTERNAL_ERROR'
  | 'ROUTE_NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'SERVICE_UNAVAILABLE'
  | 'TIMEOUT';

export interface AppErrorOptions {
  code: ErrorCode | (string & {});
  message: string;
  statusCode?: number;
  details?: Record<string, unknown>;
  expose?: boolean;
  cause?: unknown;
}

export class AppError extends Error {
  readonly code: string;
  readonly statusCode: number;
  readonly details?: Record<string, unknown>;
  readonly expose: boolean;

  constructor(options: AppErrorOptions) {
    super(options.message, { cause: options.cause });
    this.name = 'AppError';
    this.code = options.code;
    this.statusCode = options.statusCode ?? 500;
    this.details = options.details;
    this.expose = options.expose ?? this.statusCode < 500;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super({ code: 'BAD_REQUEST', message, statusCode: 400, details });
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super({ code: 'VALIDATION_ERROR', message, statusCode: 400, details });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super({ code: 'UNAUTHORIZED', message, statusCode: 401 });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super({ code: 'FORBIDDEN', message, statusCode: 403 });
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super({ code: 'NOT_FOUND', message, statusCode: 404 });
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super({ code: 'CONFLICT', message, statusCode: 409, details });
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = 'Service temporarily unavailable') {
    super({ code: 'SERVICE_UNAVAILABLE', message, statusCode: 503 });
  }
}
