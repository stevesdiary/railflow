import { describe, expect, it } from 'vitest';
import { buildTestApp, createSeededSearchRepository } from '../helpers.js';
import type { SearchJourneyRow } from '../../src/modules/search/search.types.js';

const JOURNEY_DATE = new Date('2026-08-10T00:00:00.000Z');

function nrc101Row(): SearchJourneyRow {
  return {
    journeyId: 'j1',
    journeyDate: JOURNEY_DATE,
    train: { id: 't1', number: 'NRC-101', name: 'Lagos-Abuja Express', type: 'INTERCITY' },
    stops: [
      {
        sequence: 1,
        arrivalTime: null,
        departureTime: '08:00',
        dayOffset: 0,
        station: { code: 'LAG', name: 'Lagos (Iganmu)', city: 'Lagos' },
      },
      {
        sequence: 2,
        arrivalTime: '10:30',
        departureTime: '10:45',
        dayOffset: 0,
        station: { code: 'IBADAN', name: 'Ibadan', city: 'Ibadan' },
      },
      {
        sequence: 3,
        arrivalTime: '14:00',
        departureTime: '14:15',
        dayOffset: 0,
        station: { code: 'ILORIN', name: 'Ilorin', city: 'Ilorin' },
      },
      {
        sequence: 4,
        arrivalTime: '17:30',
        departureTime: '17:45',
        dayOffset: 0,
        station: { code: 'MINNA', name: 'Minna', city: 'Minna' },
      },
      {
        sequence: 5,
        arrivalTime: '19:30',
        departureTime: null,
        dayOffset: 0,
        station: { code: 'ABJ', name: 'Abuja (Idu)', city: 'Abuja' },
      },
    ],
    classes: [
      { code: 'STD', name: 'Standard', capacity: 128, availableSeats: 128 },
      { code: 'EC', name: 'Executive', capacity: 32, availableSeats: 32 },
    ],
    fares: [
      { classCode: 'STD', amount: 18000, currency: 'NGN' },
      { classCode: 'EC', amount: 32000, currency: 'NGN' },
    ],
  };
}

describe('search routes', () => {
  it('GET /search returns journeys between origin and destination', async () => {
    const app = buildTestApp({
      search: { repository: createSeededSearchRepository([nrc101Row()]) },
    });
    const response = await app.inject({
      method: 'GET',
      url: '/search?from=LAG&to=ABJ&date=2026-08-10',
    });
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.journeys).toHaveLength(1);
    expect(body.journeys[0]).toMatchObject({
      journeyId: 'j1',
      departureTime: '08:00',
      arrivalTime: '19:30',
      durationMinutes: 690,
      stopCount: 5,
    });
    expect(body.journeys[0].from).toMatchObject({ code: 'LAG', city: 'Lagos' });
    expect(body.journeys[0].to).toMatchObject({ code: 'ABJ', city: 'Abuja' });
    expect(body.journeys[0].classes).toEqual([
      {
        code: 'STD',
        name: 'Standard',
        fare: 18000,
        currency: 'NGN',
        availableSeats: 128,
        capacity: 128,
      },
      {
        code: 'EC',
        name: 'Executive',
        fare: 32000,
        currency: 'NGN',
        availableSeats: 32,
        capacity: 32,
      },
    ]);
  });

  it('GET /search sorts journeys by departure time', async () => {
    const early: SearchJourneyRow = {
      ...nrc101Row(),
      journeyId: 'j2',
      train: { id: 't2', number: 'NRC-999', name: 'Early', type: 'EXPRESS' },
      stops: nrc101Row().stops.map((stop, index) =>
        index === 0 ? { ...stop, departureTime: '05:30' } : stop,
      ),
    };
    const app = buildTestApp({
      search: { repository: createSeededSearchRepository([nrc101Row(), early]) },
    });
    const response = await app.inject({
      method: 'GET',
      url: '/search?from=LAG&to=ABJ&date=2026-08-10',
    });
    const body = response.json();
    expect(body.journeys.map((j: { departureTime: string }) => j.departureTime)).toEqual([
      '05:30',
      '08:00',
    ]);
  });

  it('GET /search returns 400 when origin and destination are the same', async () => {
    const app = buildTestApp();
    const response = await app.inject({
      method: 'GET',
      url: '/search?from=LAG&to=lag&date=2026-08-10',
    });
    expect(response.statusCode).toBe(400);
  });

  it('GET /search returns 400 when date is malformed', async () => {
    const app = buildTestApp();
    const response = await app.inject({
      method: 'GET',
      url: '/search?from=LAG&to=ABJ&date=10-08-2026',
    });
    expect(response.statusCode).toBe(400);
  });

  it('GET /search returns 400 when from is missing', async () => {
    const app = buildTestApp();
    const response = await app.inject({
      method: 'GET',
      url: '/search?to=ABJ&date=2026-08-10',
    });
    expect(response.statusCode).toBe(400);
  });

  it('GET /search returns empty journeys when no trains serve both stations', async () => {
    const app = buildTestApp({ search: { repository: createSeededSearchRepository([]) } });
    const response = await app.inject({
      method: 'GET',
      url: '/search?from=LAG&to=ABJ&date=2026-08-10',
    });
    expect(response.statusCode).toBe(200);
    expect(response.json().journeys).toEqual([]);
  });

  it('GET /search filters classes when class is provided', async () => {
    const app = buildTestApp({
      search: { repository: createSeededSearchRepository([nrc101Row()]) },
    });
    const response = await app.inject({
      method: 'GET',
      url: '/search?from=LAG&to=ABJ&date=2026-08-10&class=EC',
    });
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.journeys).toHaveLength(1);
    expect(body.journeys[0].classes).toEqual([
      {
        code: 'EC',
        name: 'Executive',
        fare: 32000,
        currency: 'NGN',
        availableSeats: 32,
        capacity: 32,
      },
    ]);
  });

  it('GET /search returns 400 when class code is too long', async () => {
    const app = buildTestApp();
    const response = await app.inject({
      method: 'GET',
      url: '/search?from=LAG&to=ABJ&date=2026-08-10&class=SUPERCALIFRAGILISTIC',
    });
    expect(response.statusCode).toBe(400);
  });
});
