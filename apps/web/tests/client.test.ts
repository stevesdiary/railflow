import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, apiFetch } from '../src/lib/api/client';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('apiFetch', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns parsed JSON on success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ user: { id: 'u1' } })));
    const result = await apiFetch<{ user: { id: string } }>('/api/auth/me');
    expect(result.user.id).toBe('u1');
  });

  it('throws ApiError with the error envelope on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          jsonResponse(
            { error: { code: 'CONFLICT', message: 'Email already in use', requestId: 'req-1' } },
            409,
          ),
        ),
    );

    const error = await apiFetch('/api/auth/register', { method: 'POST', body: '{}' }).catch(
      (e: unknown) => e,
    );

    expect(error).toBeInstanceOf(ApiError);
    const apiError = error as ApiError;
    expect(apiError.code).toBe('CONFLICT');
    expect(apiError.message).toBe('Email already in use');
    expect(apiError.status).toBe(409);
    expect(apiError.requestId).toBe('req-1');
  });

  it('throws a generic ApiError when the body is not an error envelope', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, 500)));
    const error = await apiFetch('/api/x').catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).code).toBe('INTERNAL_ERROR');
    expect((error as ApiError).message).toContain('500');
  });

  it('throws ApiError when the response is not JSON', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('boom', { status: 500 })));
    const error = await apiFetch('/api/x').catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(500);
  });
});
