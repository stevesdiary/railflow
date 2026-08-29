import { describe, expect, it } from 'vitest';
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from '../../src/common/errors/app-error.js';
import { InventoryService } from '../../src/modules/inventory/inventory.service.js';
import type {
  InventoryRepository,
  SeatCandidate,
} from '../../src/modules/inventory/inventory.types.js';

interface FakeSeat extends SeatCandidate {
  status: 'AVAILABLE' | 'HELD' | 'BOOKED';
  expiresAt: Date | null;
}

function makeSeat(index: number): FakeSeat {
  const coachNumber = index <= 64 ? 'C1' : 'C2';
  return {
    inventoryId: `inv-${index}`,
    seatId: `seat-${index}`,
    seatNumber: `${Math.ceil(index / 4)}${['A', 'B', 'C', 'D'][(index - 1) % 4]}`,
    seatType: 'WINDOW',
    coachNumber,
    classCode: 'STD',
    className: 'Standard',
    position: index,
    status: 'AVAILABLE',
    expiresAt: null,
  };
}

class FakeInventoryRepo implements InventoryRepository {
  journeyStatus = 'SCHEDULED';
  journeyExists = true;
  seats: FakeSeat[] = Array.from({ length: 10 }, (_, i) => makeSeat(i + 1));

  getJourney = async () => (this.journeyExists ? { id: 'j1', status: this.journeyStatus } : null);
  getClassIdByCode = async (code: string) => (code === 'STD' ? 'cl-STD' : null);

  getSeatMap: InventoryRepository['getSeatMap'] = async () => null;

  getAvailability = async (_journeyId: string, _classId?: string) => {
    const counts = { available: 0, held: 0, booked: 0 };
    for (const seat of this.seats) {
      if (seat.status === 'AVAILABLE') counts.available += 1;
      else if (seat.status === 'HELD') counts.held += 1;
      else counts.booked += 1;
    }
    return {
      journeyId: 'j1',
      class: { code: 'STD', name: 'Standard' },
      counts,
      total: this.seats.length,
    };
  };

  findAvailableSeats = async (
    _journeyId: string,
    _classId: string,
    limit: number,
    preferred?: string[],
    exclude?: string[],
  ) => {
    const matches = this.seats.filter((seat) => {
      if (seat.status !== 'AVAILABLE') return false;
      if (exclude && exclude.includes(seat.inventoryId)) return false;
      if (preferred && preferred.length > 0) {
        return preferred.includes(seat.seatNumber);
      }
      return true;
    });
    return matches.slice(0, limit);
  };

  holdSeats = async (ids: string[], expiresAt: Date) => {
    let count = 0;
    for (const id of ids) {
      const seat = this.seats.find((s) => s.inventoryId === id);
      if (seat && seat.status === 'AVAILABLE') {
        seat.status = 'HELD';
        seat.expiresAt = expiresAt;
        count += 1;
      }
    }
    return count;
  };

  releaseHolds = async (ids: string[]) => {
    let count = 0;
    for (const id of ids) {
      const seat = this.seats.find((s) => s.inventoryId === id);
      if (seat && seat.status === 'HELD') {
        seat.status = 'AVAILABLE';
        seat.expiresAt = null;
        count += 1;
      }
    }
    return count;
  };

  confirmHolds = async (ids: string[]) => {
    let count = 0;
    for (const id of ids) {
      const seat = this.seats.find((s) => s.inventoryId === id);
      if (seat && seat.status === 'HELD') {
        seat.status = 'BOOKED';
        seat.expiresAt = null;
        count += 1;
      }
    }
    return count;
  };

  expireHolds = async (now: Date) => {
    let count = 0;
    for (const seat of this.seats) {
      if (seat.status === 'HELD' && seat.expiresAt && seat.expiresAt < now) {
        seat.status = 'AVAILABLE';
        seat.expiresAt = null;
        count += 1;
      }
    }
    return count;
  };

  getHeldSeat = async (id: string) => {
    const seat = this.seats.find((s) => s.inventoryId === id);
    if (!seat || seat.status !== 'HELD') return null;
    return {
      id: seat.inventoryId,
      journeyId: 'j1',
      seat: { seatNumber: seat.seatNumber, seatType: seat.seatType },
      coach: { coachNumber: seat.coachNumber },
      class: { code: seat.classCode, name: seat.className },
      expiresAt: seat.expiresAt,
    };
  };
}

function buildService(repo: FakeInventoryRepo) {
  return new InventoryService(repo, 600);
}

describe('InventoryService', () => {
  it('holds the requested number of seats', async () => {
    const repo = new FakeInventoryRepo();
    const service = buildService(repo);
    const result = await service.holdSeats({
      journeyId: 'j1',
      classCode: 'STD',
      count: 2,
    });
    expect(result.heldSeats).toHaveLength(2);
    expect(result.expiresAt.getTime()).toBeGreaterThan(Date.now());
    const held = repo.seats.filter((s) => s.status === 'HELD');
    expect(held).toHaveLength(2);
  });

  it('prefers requested seats when available', async () => {
    const repo = new FakeInventoryRepo();
    const service = buildService(repo);
    const result = await service.holdSeats({
      journeyId: 'j1',
      classCode: 'STD',
      count: 2,
      preferredSeatNumbers: ['2A', '2B'],
    });
    expect(result.heldSeats.map((s) => s.seat.seatNumber).sort()).toEqual(['2A', '2B']);
  });

  it('falls back to other seats when preferred seats are unavailable', async () => {
    const repo = new FakeInventoryRepo();
    repo.seats[1]!.status = 'BOOKED';
    const service = buildService(repo);
    const result = await service.holdSeats({
      journeyId: 'j1',
      classCode: 'STD',
      count: 2,
      preferredSeatNumbers: ['1A', '1B'],
    });
    expect(result.heldSeats).toHaveLength(2);
    const numbers = result.heldSeats.map((s) => s.seat.seatNumber);
    expect(numbers).toContain('1A');
    expect(numbers).not.toContain('1B');
    expect(new Set(numbers).size).toBe(2);
  });

  it('throws a conflict when not enough seats are available', async () => {
    const repo = new FakeInventoryRepo();
    for (let i = 0; i < 9; i++) {
      repo.seats[i]!.status = 'BOOKED';
    }
    const service = buildService(repo);
    await expect(
      service.holdSeats({ journeyId: 'j1', classCode: 'STD', count: 3 }),
    ).rejects.toBeInstanceOf(ConflictError);
  });

  it('never double-holds an already-held seat', async () => {
    const repo = new FakeInventoryRepo();
    const service = buildService(repo);
    await service.holdSeats({ journeyId: 'j1', classCode: 'STD', count: 2 });
    const second = await service.holdSeats({ journeyId: 'j1', classCode: 'STD', count: 2 });
    const heldNumbers = repo.seats.filter((s) => s.status === 'HELD').length;
    expect(second.heldSeats).toHaveLength(2);
    expect(heldNumbers).toBe(4);
    const overlap = repo.seats.filter((s) => s.status === 'HELD');
    expect(new Set(overlap.map((s) => s.inventoryId)).size).toBe(4);
  });

  it('releases held seats back to available', async () => {
    const repo = new FakeInventoryRepo();
    const service = buildService(repo);
    const { heldSeats } = await service.holdSeats({
      journeyId: 'j1',
      classCode: 'STD',
      count: 2,
    });
    const released = await service.releaseHolds(heldSeats.map((s) => s.id));
    expect(released).toBe(2);
    expect(repo.seats.every((s) => s.status === 'AVAILABLE')).toBe(true);
  });

  it('confirms held seats as booked', async () => {
    const repo = new FakeInventoryRepo();
    const service = buildService(repo);
    const { heldSeats } = await service.holdSeats({
      journeyId: 'j1',
      classCode: 'STD',
      count: 2,
    });
    const confirmed = await service.confirmHolds(heldSeats.map((s) => s.id));
    expect(confirmed).toBe(2);
    expect(repo.seats.filter((s) => s.status === 'BOOKED')).toHaveLength(2);
  });

  it('expires stale holds and frees the seats', async () => {
    const repo = new FakeInventoryRepo();
    const service = new InventoryService(repo, 1);
    await service.holdSeats({ journeyId: 'j1', classCode: 'STD', count: 2 });
    await new Promise((resolve) => setTimeout(resolve, 1100));
    const expired = await service.expireHolds();
    expect(expired).toBe(2);
    expect(repo.seats.every((s) => s.status === 'AVAILABLE')).toBe(true);
  });

  it('reports availability counts', async () => {
    const repo = new FakeInventoryRepo();
    repo.seats[0]!.status = 'HELD';
    repo.seats[1]!.status = 'BOOKED';
    const service = buildService(repo);
    const summary = await service.getAvailability('j1', 'STD');
    expect(summary.counts).toEqual({ available: 8, held: 1, booked: 1 });
  });

  it('rejects a count outside the valid range', async () => {
    const service = buildService(new FakeInventoryRepo());
    await expect(
      service.holdSeats({ journeyId: 'j1', classCode: 'STD', count: 0 }),
    ).rejects.toBeInstanceOf(ValidationError);
    await expect(
      service.holdSeats({ journeyId: 'j1', classCode: 'STD', count: 11 }),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('rejects an unknown class', async () => {
    const service = buildService(new FakeInventoryRepo());
    await expect(
      service.holdSeats({ journeyId: 'j1', classCode: 'NOPE', count: 1 }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('throws not found for a missing journey', async () => {
    const repo = new FakeInventoryRepo();
    repo.journeyExists = false;
    const service = buildService(repo);
    await expect(
      service.holdSeats({ journeyId: 'missing', classCode: 'STD', count: 1 }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('rejects holds on a cancelled journey', async () => {
    const repo = new FakeInventoryRepo();
    repo.journeyStatus = 'CANCELLED';
    const service = buildService(repo);
    await expect(
      service.holdSeats({ journeyId: 'j1', classCode: 'STD', count: 1 }),
    ).rejects.toBeInstanceOf(ConflictError);
  });

  it('returns a seat map with effective per-seat status', async () => {
    const repo = new FakeInventoryRepo();
    repo.getSeatMap = async () => ({
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
            capacity: 2,
            class: { code: 'STD', name: 'Standard' },
            seats: [
              {
                id: 'seat-1',
                seatNumber: '1A',
                seatType: 'WINDOW',
                position: 1,
                status: 'AVAILABLE',
              },
              {
                id: 'seat-2',
                seatNumber: '1B',
                seatType: 'AISLE',
                position: 2,
                status: 'AVAILABLE',
              },
              {
                id: 'seat-3',
                seatNumber: '2A',
                seatType: 'WINDOW',
                position: 3,
                status: 'AVAILABLE',
              },
            ],
          },
        ],
      },
      inventory: [
        { seatId: 'seat-1', status: 'HELD' },
        { seatId: 'seat-3', status: 'BOOKED' },
      ],
    });
    const service = buildService(repo);
    const map = await service.getSeatMap('j1');
    expect(map.train).toMatchObject({ number: 'NRC-101' });
    expect(map.coaches).toHaveLength(1);
    expect(map.coaches[0]!.seats.map((s) => s.status)).toEqual(['HELD', 'AVAILABLE', 'BOOKED']);
  });

  it('maps seats without inventory rows from physical status', async () => {
    const repo = new FakeInventoryRepo();
    repo.getSeatMap = async () => ({
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
                status: 'MAINTENANCE',
              },
              {
                id: 'seat-2',
                seatNumber: '1B',
                seatType: 'AISLE',
                position: 2,
                status: 'CANCELLED',
              },
            ],
          },
        ],
      },
      inventory: [],
    });
    const service = buildService(repo);
    const map = await service.getSeatMap('j1');
    expect(map.coaches[0]!.seats.map((s) => s.status)).toEqual(['MAINTENANCE', 'CANCELLED']);
  });

  it('throws not found for a seat map of a missing journey', async () => {
    const repo = new FakeInventoryRepo();
    repo.journeyExists = false;
    const service = buildService(repo);
    await expect(service.getSeatMap('missing')).rejects.toBeInstanceOf(NotFoundError);
  });

  it('rejects a seat map for a cancelled journey', async () => {
    const repo = new FakeInventoryRepo();
    repo.journeyStatus = 'CANCELLED';
    const service = buildService(repo);
    await expect(service.getSeatMap('j1')).rejects.toBeInstanceOf(ConflictError);
  });
});
