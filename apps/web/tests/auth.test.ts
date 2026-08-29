import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createAuthApi } from '../src/lib/api/auth';
import type { AuthApi } from '../src/lib/api/auth';
import { tokenStore } from '../src/lib/auth/token-store';

function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    getItem: (key: string) => data.get(key) ?? null,
    key: (index: number) => [...data.keys()][index] ?? null,
    removeItem: (key: string) => void data.delete(key),
    setItem: (key: string, value: string) => void data.set(key, String(value)),
  };
}

beforeEach(() => {
  vi.stubGlobal('localStorage', memoryStorage());
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const LOGIN_RESPONSE = {
  accessToken: 'access-1',
  refreshToken: 'refresh-1',
  expiresIn: 900,
  user: {
    id: 'u1',
    email: 'ada@example.com',
    firstName: 'Ada',
    lastName: 'Lovelace',
    role: 'USER',
    status: 'ACTIVE',
    emailVerified: true,
    createdAt: '2026-01-01T00:00:00.000Z',
  },
};

describe('auth api', () => {
  let api: AuthApi;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    api = createAuthApi('/api');
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts credentials to /auth/login', async () => {
    fetchMock.mockResolvedValue(jsonResponse(LOGIN_RESPONSE));
    const result = await api.login({ email: 'ada@example.com', password: 'password123' });

    expect(fetchMock).toHaveBeenCalledWith('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'ada@example.com', password: 'password123' }),
    });
    expect(result.user.email).toBe('ada@example.com');
  });

  it('attaches the bearer token to /auth/me', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ user: LOGIN_RESPONSE.user }));
    await api.me('access-1');

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(init.headers).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer access-1',
    });
  });

  it('GETs /auth/verify-email with an encoded token', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ email: 'ada@example.com', verified: true }));
    await api.verifyEmail('tok+en');
    expect(fetchMock).toHaveBeenCalledWith('/api/auth/verify-email?token=tok%2Ben', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('stores and clears the session via tokenStore', () => {
    tokenStore.setSession('access-1', 'refresh-1', LOGIN_RESPONSE.user);
    expect(tokenStore.getAccessToken()).toBe('access-1');
    expect(tokenStore.getRefreshToken()).toBe('refresh-1');
    expect(tokenStore.getUser()?.firstName).toBe('Ada');

    tokenStore.clear();
    expect(tokenStore.getAccessToken()).toBeNull();
    expect(tokenStore.getUser()).toBeNull();
  });
});
