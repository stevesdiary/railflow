import { describe, expect, it } from 'vitest';
import { FastifyJwtTokenService } from '../../src/modules/identity/tokens.js';
import { hashPassword } from '../../src/modules/identity/password.js';
import { buildTestApp, MemoryAuthInfra } from '../helpers.js';

const lightArgon = { memoryCost: 16_384, timeCost: 2, parallelism: 1 };

function buildTestAppWithAuth(infra: MemoryAuthInfra) {
  return buildTestApp({
    infra,
    identity: (app) => infra.deps(new FastifyJwtTokenService(app, '15m')),
  });
}

async function registerAndVerify(
  app: Awaited<ReturnType<typeof buildTestApp>>,
  infra: MemoryAuthInfra,
) {
  const register = await app.inject({
    method: 'POST',
    url: '/auth/register',
    payload: {
      email: 'ada@example.com',
      password: 'password123',
      firstName: 'Ada',
      lastName: 'Lovelace',
    },
  });
  const message = infra.mail[0];
  const rawToken = /token=([^\s]+)/.exec(message?.text ?? '')?.[1] as string;

  const verify = await app.inject({ method: 'GET', url: `/auth/verify-email?token=${rawToken}` });
  expect(verify.statusCode).toBe(200);
  return register;
}

describe('auth routes', () => {
  it('registers a user and returns 201', async () => {
    const infra = new MemoryAuthInfra();
    const app = buildTestAppWithAuth(infra);

    const response = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'ada@example.com',
        password: 'password123',
        firstName: 'Ada',
        lastName: 'Lovelace',
      },
    });

    expect(response.statusCode).toBe(201);
    const body = response.json();
    expect(body.user.email).toBe('ada@example.com');
    expect(body.user.status).toBe('PENDING_VERIFICATION');
    expect(infra.mail).toHaveLength(1);
    await app.close();
  });

  it('rejects duplicate registration with 409', async () => {
    const infra = new MemoryAuthInfra();
    const app = buildTestAppWithAuth(infra);
    await registerAndVerify(app, infra);

    const response = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'ada@example.com',
        password: 'password123',
        firstName: 'Ada',
        lastName: 'Lovelace',
      },
    });

    expect(response.statusCode).toBe(409);
    expect(response.json().error.code).toBe('CONFLICT');
    await app.close();
  });

  it('rejects invalid registration payloads with 400', async () => {
    const infra = new MemoryAuthInfra();
    const app = buildTestAppWithAuth(infra);

    const response = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: { email: 'not-an-email', password: 'short', firstName: '', lastName: '' },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe('VALIDATION_ERROR');
    expect(response.json().error.details.issues.length).toBeGreaterThan(0);
    await app.close();
  });

  it('runs the full happy path: register -> verify -> login -> me', async () => {
    const infra = new MemoryAuthInfra();
    const app = buildTestAppWithAuth(infra);
    await registerAndVerify(app, infra);

    const login = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: { email: 'ada@example.com', password: 'password123' },
    });
    expect(login.statusCode).toBe(200);
    const loginBody = login.json();
    expect(loginBody.accessToken).toBeTruthy();
    expect(loginBody.refreshToken).toBeTruthy();

    const me = await app.inject({
      method: 'GET',
      url: '/auth/me',
      headers: { authorization: `Bearer ${loginBody.accessToken}` },
    });
    expect(me.statusCode).toBe(200);
    expect(me.json().user.email).toBe('ada@example.com');
    expect(me.json().user.emailVerified).toBe(true);
    await app.close();
  });

  it('rejects login with wrong credentials', async () => {
    const infra = new MemoryAuthInfra();
    const app = buildTestAppWithAuth(infra);
    const passwordHash = await hashPassword('password123', lightArgon);
    infra.addUser({ email: 'ada@example.com', passwordHash, status: 'ACTIVE' });

    const response = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: { email: 'ada@example.com', password: 'nope' },
    });

    expect(response.statusCode).toBe(401);
    expect(response.json().error.code).toBe('UNAUTHORIZED');
    await app.close();
  });

  it('refreshes and rotates the token pair', async () => {
    const infra = new MemoryAuthInfra();
    const app = buildTestAppWithAuth(infra);
    await registerAndVerify(app, infra);

    const login = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: { email: 'ada@example.com', password: 'password123' },
    });
    const { refreshToken } = login.json();

    const refresh = await app.inject({
      method: 'POST',
      url: '/auth/refresh',
      payload: { refreshToken },
    });
    expect(refresh.statusCode).toBe(200);
    expect(refresh.json().refreshToken).not.toBe(refreshToken);
    expect(refresh.json().accessToken).toBeTruthy();
    await app.close();
  });

  it('logs out and invalidates the refresh token', async () => {
    const infra = new MemoryAuthInfra();
    const app = buildTestAppWithAuth(infra);
    await registerAndVerify(app, infra);

    const login = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: { email: 'ada@example.com', password: 'password123' },
    });
    const { refreshToken } = login.json();

    const logout = await app.inject({
      method: 'POST',
      url: '/auth/logout',
      payload: { refreshToken },
    });
    expect(logout.statusCode).toBe(204);

    const refresh = await app.inject({
      method: 'POST',
      url: '/auth/refresh',
      payload: { refreshToken },
    });
    expect(refresh.statusCode).toBe(401);
    expect(refresh.json().error.code).toBe('UNAUTHORIZED');
    await app.close();
  });

  it('returns 401 for /auth/me without a valid token', async () => {
    const infra = new MemoryAuthInfra();
    const app = buildTestAppWithAuth(infra);

    const noToken = await app.inject({ method: 'GET', url: '/auth/me' });
    expect(noToken.statusCode).toBe(401);

    const badToken = await app.inject({
      method: 'GET',
      url: '/auth/me',
      headers: { authorization: 'Bearer garbage.token.here' },
    });
    expect(badToken.statusCode).toBe(401);
    expect(badToken.json().error.code).toBe('UNAUTHORIZED');
    await app.close();
  });
});
