import { describe, expect, it } from 'vitest';
import { FastifyJwtTokenService } from '../../src/modules/identity/tokens.js';
import type { InventoryRepository } from '../../src/modules/inventory/inventory.types.js';
import { buildTestApp, MemoryAuthInfra } from '../helpers.js';

const AVAILABLE_SUMMARY = {
  journeyId: 'j1',
  class: { code: 'STD', name: 'Standard' },
  counts: { available: 100, held: 5, booked: 3 },
  total: 108,
};

function seededInventoryRepo(): InventoryRepository {
  let held = false;
  return {
    getJourney: async () => ({ id: 'j1', status: 'SCHEDULED' }),
    getAvailability: async () => AVAILABLE_SUMMARY,
    getSeatMap: async () => ({
      journeyId: 'j1',
      train: {
        id: 't1',
        number: 'NRC-101',
        name: 'Express',
        type: 'INTERCITY',
        coaches: [
          {
            id: 'c1',
            coachNumber: 'C1',
            capacity: 1,
            class: { code: 'STD', name: 'Standard' },
            seats: [
              {
                id: 'seat-1',
                seatNumber: '1A',
                seatType: 'WINDOW',
                position: 1,
                status: 'AVAILABLE',
              },
            ],
          },
        ],
      },
      inventory: [{ seatId: 'seat-1', status: 'AVAILABLE' }],
    }),
    findAvailableSeats: async () => [
      {
        inventoryId: 'inv-1',
        seatId: 'seat-1',
        seatNumber: '1A',
        seatType: 'WINDOW',
        coachNumber: 'C1',
        classCode: 'STD',
        className: 'Standard',
        position: 1,
      },
    ],
    holdSeats: async (ids) => {
      held = true;
      return ids.length;
    },
    releaseHolds: async () => 1,
    confirmHolds: async (ids) => ids.length,
    expireHolds: async () => 0,
    getHeldSeat: async (id) =>
      held
        ? {
            id,
            journeyId: 'j1',
            seat: { seatNumber: '1A', seatType: 'WINDOW' },
            coach: { coachNumber: 'C1' },
            class: { code: 'STD', name: 'Standard' },
            expiresAt: new Date(Date.now() + 600_000),
          }
        : null,
    getClassIdByCode: async (code) => (code === 'STD' ? 'cl-STD' : null),
  };
}

async function accessToken(app: ReturnType<typeof buildTestApp>, userId = 'u1') {
  await app.ready();
  return new FastifyJwtTokenService(app, '15m').signAccessToken({
    sub: userId,
    email: `${userId}@test.local`,
    role: 'USER',
  });
}

describe('inventory routes', () => {
  it('GET /journeys/:id/availability returns counts (public)', async () => {
    const app = buildTestApp({ inventory: { repository: seededInventoryRepo() } });
    const response = await app.inject({
      method: 'GET',
      url: '/journeys/j1/availability?class=STD',
    });
    expect(response.statusCode).toBe(200);
    expect(response.json().counts).toEqual(AVAILABLE_SUMMARY.counts);
    await app.close();
  });

  it('GET /journeys/:id/seats returns the coach seat map (public)', async () => {
    const app = buildTestApp({ inventory: { repository: seededInventoryRepo() } });
    const response = await app.inject({
      method: 'GET',
      url: '/journeys/j1/seats',
    });
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.journeyId).toBe('j1');
    expect(body.train).toMatchObject({ number: 'NRC-101' });
    expect(body.coaches).toHaveLength(1);
    expect(body.coaches[0].seats).toEqual([
      { id: 'seat-1', seatNumber: '1A', seatType: 'WINDOW', position: 1, status: 'AVAILABLE' },
    ]);
    await app.close();
  });

  it('GET /journeys/:id/seats returns 404 for a missing journey', async () => {
    const app = buildTestApp();
    const response = await app.inject({
      method: 'GET',
      url: '/journeys/missing/seats',
    });
    expect(response.statusCode).toBe(404);
    await app.close();
  });

  it('POST /inventory/holds requires authentication', async () => {
    const app = buildTestApp({ inventory: { repository: seededInventoryRepo() } });
    const response = await app.inject({
      method: 'POST',
      url: '/inventory/holds',
      payload: { journeyId: 'j1', classCode: 'STD', count: 1 },
    });
    expect(response.statusCode).toBe(401);
    await app.close();
  });

  it('POST /inventory/holds holds seats for an authenticated user', async () => {
    const infra = new MemoryAuthInfra();
    const app = buildTestApp({
      infra,
      inventory: { repository: seededInventoryRepo() },
      identity: (inner) => infra.deps(new FastifyJwtTokenService(inner, '15m')),
    });
    const response = await app.inject({
      method: 'POST',
      url: '/inventory/holds',
      headers: { authorization: `Bearer ${await accessToken(app)}` },
      payload: { journeyId: 'j1', classCode: 'STD', count: 1 },
    });
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.heldSeats).toHaveLength(1);
    expect(body.heldSeats[0]).toMatchObject({
      id: 'inv-1',
      seat: { seatNumber: '1A' },
      coach: { coachNumber: 'C1' },
    });
    expect(body.expiresAt).toBeTruthy();
    await app.close();
  });

  it('POST /inventory/holds/release releases held seats', async () => {
    const infra = new MemoryAuthInfra();
    const app = buildTestApp({
      infra,
      inventory: { repository: seededInventoryRepo() },
      identity: (inner) => infra.deps(new FastifyJwtTokenService(inner, '15m')),
    });
    const response = await app.inject({
      method: 'POST',
      url: '/inventory/holds/release',
      headers: { authorization: `Bearer ${await accessToken(app)}` },
      payload: { holdIds: ['inv-1', 'inv-2'] },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json().released).toBe(1);
    await app.close();
  });

  it('POST /inventory/holds returns 404 for an unknown class', async () => {
    const infra = new MemoryAuthInfra();
    const app = buildTestApp({
      infra,
      inventory: { repository: seededInventoryRepo() },
      identity: (inner) => infra.deps(new FastifyJwtTokenService(inner, '15m')),
    });
    const response = await app.inject({
      method: 'POST',
      url: '/inventory/holds',
      headers: { authorization: `Bearer ${await accessToken(app)}` },
      payload: { journeyId: 'j1', classCode: 'NOPE', count: 1 },
    });
    expect(response.statusCode).toBe(404);
    await app.close();
  });
});
