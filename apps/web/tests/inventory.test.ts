import { afterEach, describe, expect, it, vi } from 'vitest';
import { createInventoryApi } from '../src/lib/api/inventory';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const SEAT_MAP = {
  journeyId: 'j1',
  train: { id: 't1', number: 'NRC-101', name: 'Lagos-Abuja Express', type: 'INTERCITY' },
  coaches: [
    {
      id: 'c1',
      coachNumber: 'C1',
      capacity: 2,
      class: { code: 'STD', name: 'Standard' },
      seats: [
        { id: 'seat-1', seatNumber: '1A', seatType: 'WINDOW', position: 1, status: 'AVAILABLE' },
        { id: 'seat-2', seatNumber: '1B', seatType: 'AISLE', position: 2, status: 'AVAILABLE' },
      ],
    },
  ],
};

describe('inventoryApi', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads the seat map for a journey', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(SEAT_MAP)));
    const result = await createInventoryApi().getSeatMap('j1');
    expect(result).toEqual(SEAT_MAP);
    expect(fetch).toHaveBeenCalledWith(
      '/api/journeys/j1/seats',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('holds seats with the access token', async () => {
    const hold = {
      heldSeats: [
        {
          id: 'inv-1',
          journeyId: 'j1',
          seat: { seatNumber: '1A', seatType: 'WINDOW' },
          coach: { coachNumber: 'C1' },
          class: { code: 'STD', name: 'Standard' },
          expiresAt: '2026-08-08T03:00:00.000Z',
        },
      ],
      expiresAt: '2026-08-08T03:00:00.000Z',
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(hold)));
    const result = await createInventoryApi().holdSeats(
      { journeyId: 'j1', classCode: 'STD', count: 1, preferredSeatNumbers: ['1A'] },
      'token-123',
    );
    expect(result.heldSeats).toHaveLength(1);
    expect(fetch).toHaveBeenCalledWith(
      '/api/inventory/holds',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: 'Bearer token-123' }),
        body: JSON.stringify({
          journeyId: 'j1',
          classCode: 'STD',
          count: 1,
          preferredSeatNumbers: ['1A'],
        }),
      }),
    );
  });

  it('releases held seats', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ released: 2 })));
    const result = await createInventoryApi().releaseHolds(['inv-1', 'inv-2'], 'token-123');
    expect(result.released).toBe(2);
    expect(fetch).toHaveBeenCalledWith(
      '/api/inventory/holds/release',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: 'Bearer token-123' }),
        body: JSON.stringify({ holdIds: ['inv-1', 'inv-2'] }),
      }),
    );
  });
});
