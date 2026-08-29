export interface ApiErrorDetails {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  requestId?: string;
  status: number;
}

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly details?: Record<string, unknown>;
  readonly requestId?: string;

  constructor(info: ApiErrorDetails) {
    super(info.message);
    this.name = 'ApiError';
    this.code = info.code;
    this.status = info.status;
    this.details = info.details;
    this.requestId = info.requestId;
  }
}

interface ErrorEnvelope {
  error?: {
    code?: string;
    message?: string;
    details?: Record<string, unknown>;
    requestId?: string;
  };
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  headers: HeadersInit = {},
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers as Record<string, string> | undefined),
      ...headers,
    },
  });

  const body = (await response.json().catch(() => null)) as T | ErrorEnvelope | null;

  if (!response.ok) {
    const envelope = body as ErrorEnvelope | null;
    throw new ApiError({
      code: envelope?.error?.code ?? 'INTERNAL_ERROR',
      message: envelope?.error?.message ?? `Request failed with status ${response.status}`,
      details: envelope?.error?.details,
      requestId: envelope?.error?.requestId,
      status: response.status,
    });
  }

  return body as T;
}
