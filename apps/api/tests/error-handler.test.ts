import { describe, expect, it } from 'vitest';
import { buildTestApp, testConfig } from './helpers.js';
import { AppError, NotFoundError, ValidationError } from '../src/common/errors/app-error.js';

describe('global error handler', () => {
  it('maps AppError to its status code and standard shape', async () => {
    const app = buildTestApp();
    app.get('/boom', () => {
      throw new NotFoundError('Train not found');
    });

    const response = await app.inject({ method: 'GET', url: '/boom' });
    expect(response.statusCode).toBe(404);
    const body = response.json();
    expect(body.error.code).toBe('NOT_FOUND');
    expect(body.error.message).toBe('Train not found');
    expect(body.error.requestId).toBeDefined();
    await app.close();
  });

  it('includes details for validation-style errors', async () => {
    const app = buildTestApp();
    app.get('/bad', () => {
      throw new ValidationError('Invalid payload', { field: 'origin' });
    });

    const response = await app.inject({ method: 'GET', url: '/bad' });
    expect(response.statusCode).toBe(400);
    const body = response.json();
    expect(body.error.code).toBe('VALIDATION_ERROR');
    expect(body.error.details).toEqual({ field: 'origin' });
    await app.close();
  });

  it('hides internal details for non-exposed errors in production', async () => {
    const app = buildTestApp({ config: testConfig({ NODE_ENV: 'production' }) });
    app.get('/internal', () => {
      throw new Error('secret internal detail');
    });

    const response = await app.inject({ method: 'GET', url: '/internal' });
    expect(response.statusCode).toBe(500);
    const body = response.json();
    expect(body.error.code).toBe('INTERNAL_ERROR');
    expect(body.error.message).toBe('Internal server error');
    expect(JSON.stringify(body)).not.toContain('secret internal detail');
    await app.close();
  });

  it('maps Fastify schema validation failures to 400', async () => {
    const app = buildTestApp();
    app.get(
      '/validated',
      {
        schema: {
          querystring: {
            type: 'object',
            properties: { limit: { type: 'integer' } },
            required: ['limit'],
          },
        },
      },
      async () => ({ ok: true }),
    );

    const response = await app.inject({ method: 'GET', url: '/validated' });
    expect(response.statusCode).toBe(400);
    const body = response.json();
    expect(body.error.code).toBe('VALIDATION_ERROR');
    expect(Array.isArray(body.error.details.issues)).toBe(true);
    expect(body.error.details.issues.length).toBeGreaterThan(0);
    for (const issue of body.error.details.issues as Array<{ path: string; message: string }>) {
      expect(typeof issue.path).toBe('string');
      expect(typeof issue.message).toBe('string');
    }
    await app.close();
  });

  it('exposes stack traces for internal errors in development', async () => {
    const app = buildTestApp({ config: testConfig({ NODE_ENV: 'development' }) });
    app.get('/stack', () => {
      throw new Error('explode');
    });

    const response = await app.inject({ method: 'GET', url: '/stack' });
    expect(response.statusCode).toBe(500);
    const body = response.json();
    expect(body.error.details.stack).toContain('explode');
    await app.close();
  });

  it('treats non-AppError domain errors as internal by default', async () => {
    const app = buildTestApp();
    const code = new AppError({
      code: 'FARE_CALC_FAILED',
      message: 'fare',
      statusCode: 500,
      expose: false,
    });
    app.get('/fare', () => {
      throw code;
    });

    const response = await app.inject({ method: 'GET', url: '/fare' });
    expect(response.statusCode).toBe(500);
    expect(response.json().error.code).toBe('FARE_CALC_FAILED');
    await app.close();
  });
});
