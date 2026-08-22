import { describe, expect, it } from 'vitest';
import { buildTestApp, createSeededRailwayRepository } from '../helpers.js';

describe('railway routes', () => {
  it('GET /stations lists stations', async () => {
    const app = buildTestApp({ railway: createSeededRailwayRepository() });
    const response = await app.inject({ method: 'GET', url: '/stations' });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.stations).toHaveLength(2);
    expect(body.stations[0]).toMatchObject({ code: 'LAG', name: 'Lagos (Iganmu)' });
    await app.close();
  });

  it('GET /stations passes a trimmed query through', async () => {
    const app = buildTestApp({ railway: createSeededRailwayRepository() });
    const response = await app.inject({ method: 'GET', url: '/stations?query=ibadan' });

    expect(response.statusCode).toBe(200);
    expect(response.json().stations).toHaveLength(1);
    await app.close();
  });

  it('GET /stations returns a station by code', async () => {
    const app = buildTestApp({ railway: createSeededRailwayRepository() });
    const response = await app.inject({ method: 'GET', url: '/stations/LAG' });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.station.code).toBe('LAG');
    expect(body.station.name).toBe('Lagos (Iganmu)');
    await app.close();
  });

  it('GET /stations/:code returns 404 for an unknown code', async () => {
    const app = buildTestApp({ railway: createSeededRailwayRepository() });
    const response = await app.inject({ method: 'GET', url: '/stations/XYZ' });

    expect(response.statusCode).toBe(404);
    expect(response.json().error.code).toBe('NOT_FOUND');
    await app.close();
  });

  it('GET /trains lists trains', async () => {
    const app = buildTestApp({ railway: createSeededRailwayRepository() });
    const response = await app.inject({ method: 'GET', url: '/trains' });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.trains).toHaveLength(1);
    expect(body.trains[0]).toMatchObject({
      number: 'NRC-101',
      stopCount: 2,
      origin: { code: 'LAG' },
      destination: { code: 'IBADAN' },
    });
    await app.close();
  });

  it('GET /trains/:number returns a train with stops and coaches', async () => {
    const app = buildTestApp({ railway: createSeededRailwayRepository() });
    const response = await app.inject({ method: 'GET', url: '/trains/NRC-101' });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.train.number).toBe('NRC-101');
    expect(body.train.stops).toHaveLength(2);
    expect(body.train.coaches).toHaveLength(1);
    expect(body.train.coaches[0]).toMatchObject({ coachNumber: 'C1', class: { code: 'STD' } });
    await app.close();
  });

  it('GET /trains/:number returns 404 for an unknown train', async () => {
    const app = buildTestApp({ railway: createSeededRailwayRepository() });
    const response = await app.inject({ method: 'GET', url: '/trains/NRC-999' });

    expect(response.statusCode).toBe(404);
    expect(response.json().error.code).toBe('NOT_FOUND');
    await app.close();
  });

  it('GET /classes and GET /quotas return reference data', async () => {
    const app = buildTestApp({ railway: createSeededRailwayRepository() });
    const classes = await app.inject({ method: 'GET', url: '/classes' });
    const quotas = await app.inject({ method: 'GET', url: '/quotas' });

    expect(classes.statusCode).toBe(200);
    expect(classes.json().classes).toHaveLength(1);
    expect(quotas.statusCode).toBe(200);
    expect(quotas.json().quotas).toHaveLength(1);
    await app.close();
  });

  it('GET /fares returns fares and normalizes filter codes', async () => {
    const app = buildTestApp({ railway: createSeededRailwayRepository() });
    const response = await app.inject({
      method: 'GET',
      url: '/fares?from=lag&to=ibadan&class=std',
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.fares).toHaveLength(1);
    expect(body.fares[0]).toMatchObject({ amount: 3500, currency: 'NGN' });
    await app.close();
  });

  it('GET /fares returns 400 when origin equals destination', async () => {
    const app = buildTestApp({ railway: createSeededRailwayRepository() });
    const response = await app.inject({ method: 'GET', url: '/fares?from=LAG&to=lag' });

    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe('VALIDATION_ERROR');
    await app.close();
  });
});
