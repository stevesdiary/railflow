import { describe, expect, it, vi } from 'vitest';
import { buildTestApp } from './helpers.js';

describe('api application', () => {
  it('responds to /healthz', async () => {
    const app = buildTestApp();
    const response = await app.inject({ method: 'GET', url: '/healthz' });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.status).toBe('ok');
    expect(body.service).toBe('railflow-api');
    await app.close();
  });

  it('responds ready on /readyz when database is reachable', async () => {
    const app = buildTestApp({ checkDatabase: async () => true });
    const response = await app.inject({ method: 'GET', url: '/readyz' });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.status).toBe('ready');
    expect(body.checks).toEqual([expect.objectContaining({ name: 'database', status: 'ok' })]);
    await app.close();
  });

  it('responds 503 on /readyz when database is down', async () => {
    const app = buildTestApp({ checkDatabase: async () => false });
    const response = await app.inject({ method: 'GET', url: '/readyz' });

    expect(response.statusCode).toBe(503);
    const body = response.json();
    expect(body.status).toBe('not_ready');
    await app.close();
  });

  it('returns a standard error shape for unknown routes', async () => {
    const app = buildTestApp();
    const response = await app.inject({ method: 'GET', url: '/api/does-not-exist' });

    expect(response.statusCode).toBe(404);
    const body = response.json();
    expect(body.error.code).toBe('ROUTE_NOT_FOUND');
    expect(body.error.requestId).toBeDefined();
    await app.close();
  });

  it('assigns a requestId when the client does not supply one', async () => {
    const app = buildTestApp();
    app.get('/echo-id', async (request) => ({ requestId: request.id }));

    const response = await app.inject({ method: 'GET', url: '/echo-id' });
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.requestId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    await app.close();
  });

  it('honours a client-supplied request id', async () => {
    const app = buildTestApp();
    app.get('/echo-id', async (request) => ({ requestId: request.id }));

    const response = await app.inject({
      method: 'GET',
      url: '/echo-id',
      headers: { 'x-request-id': 'client-req-123' },
    });
    expect(response.json().requestId).toBe('client-req-123');
    await app.close();
  });

  it('closes cleanly', async () => {
    const app = buildTestApp({ checkDatabase: vi.fn(async () => true) });
    await app.inject({ method: 'GET', url: '/healthz' });
    await expect(app.close()).resolves.toBeUndefined();
  });
});
