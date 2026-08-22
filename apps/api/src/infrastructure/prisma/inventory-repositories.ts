import type { PrismaClient } from '../../generated/prisma/client.js';
import type {
  InventoryRepository,
  PublicAvailabilitySummary,
  PublicHeldSeat,
  SeatCandidate,
  SeatMapRow,
} from '../../modules/inventory/inventory.types.js';

export class PrismaInventoryRepository implements InventoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getJourney(journeyId: string): Promise<{ id: string; status: string } | null> {
    const journey = await this.prisma.journey.findUnique({
      where: { id: journeyId },
      select: { id: true, status: true },
    });
    return journey;
  }

  async getAvailability(journeyId: string, classId?: string): Promise<PublicAvailabilitySummary> {
    const items = await this.prisma.inventoryItem.findMany({
      where: {
        journeyId,
        ...(classId ? { seat: { coach: { classId } } } : {}),
      },
      select: { status: true, seat: { select: { coach: { select: { class: true } } } } },
    });

    const counts = { available: 0, held: 0, booked: 0 };
    for (const item of items) {
      switch (item.status) {
        case 'AVAILABLE':
          counts.available += 1;
          break;
        case 'HELD':
          counts.held += 1;
          break;
        case 'BOOKED':
          counts.booked += 1;
          break;
      }
    }

    const firstClass = items[0]?.seat.coach.class ?? null;
    return {
      journeyId,
      class: firstClass ? { code: firstClass.code, name: firstClass.name } : classId ? null : null,
      counts,
      total: items.length,
    };
  }

  async getSeatMap(journeyId: string): Promise<SeatMapRow | null> {
    const journey = await this.prisma.journey.findUnique({
      where: { id: journeyId },
      select: {
        id: true,
        train: {
          select: {
            id: true,
            number: true,
            name: true,
            type: true,
            coaches: {
              where: { status: 'ACTIVE' },
              orderBy: { coachNumber: 'asc' },
              select: {
                id: true,
                coachNumber: true,
                capacity: true,
                class: { select: { code: true, name: true } },
                seats: {
                  orderBy: { position: 'asc' },
                  select: {
                    id: true,
                    seatNumber: true,
                    seatType: true,
                    position: true,
                    status: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!journey) {
      return null;
    }

    const inventory = await this.prisma.inventoryItem.findMany({
      where: { journeyId },
      select: { seatId: true, status: true },
    });

    return {
      journeyId: journey.id,
      train: {
        id: journey.train.id,
        number: journey.train.number,
        name: journey.train.name,
        type: journey.train.type,
        coaches: journey.train.coaches.map((coach) => ({
          id: coach.id,
          coachNumber: coach.coachNumber,
          capacity: coach.capacity,
          class: coach.class,
          seats: coach.seats.map((seat) => ({
            id: seat.id,
            seatNumber: seat.seatNumber,
            seatType: seat.seatType,
            position: seat.position,
            status: seat.status,
          })),
        })),
      },
      inventory,
    };
  }

  async findAvailableSeats(
    journeyId: string,
    classId: string,
    limit: number,
    preferredSeatNumbers?: string[],
    excludeInventoryIds?: string[],
  ): Promise<SeatCandidate[]> {
    const rows = await this.prisma.inventoryItem.findMany({
      where: {
        journeyId,
        status: 'AVAILABLE',
        ...(excludeInventoryIds && excludeInventoryIds.length > 0
          ? { id: { notIn: excludeInventoryIds } }
          : {}),
        seat: {
          coach: { classId, status: 'ACTIVE' },
          ...(preferredSeatNumbers && preferredSeatNumbers.length > 0
            ? { seatNumber: { in: preferredSeatNumbers } }
            : {}),
        },
      },
      select: {
        id: true,
        seat: {
          select: {
            id: true,
            seatNumber: true,
            seatType: true,
            position: true,
            coach: {
              select: {
                coachNumber: true,
                class: { select: { code: true, name: true } },
              },
            },
          },
        },
      },
      orderBy: [{ seat: { coach: { coachNumber: 'asc' } } }, { seat: { position: 'asc' } }],
      take: limit,
    });

    return rows.map((row) => ({
      inventoryId: row.id,
      seatId: row.seat.id,
      seatNumber: row.seat.seatNumber,
      seatType: row.seat.seatType,
      coachNumber: row.seat.coach.coachNumber,
      classCode: row.seat.coach.class.code,
      className: row.seat.coach.class.name,
      position: row.seat.position,
    }));
  }

  async holdSeats(inventoryIds: string[], holdExpiresAt: Date): Promise<number> {
    if (inventoryIds.length === 0) {
      return 0;
    }
    return this.prisma.$transaction(async (tx) => {
      const result = await tx.inventoryItem.updateMany({
        where: { id: { in: inventoryIds }, status: 'AVAILABLE' },
        data: { status: 'HELD', holdExpiresAt },
      });
      return result.count;
    });
  }

  async releaseHolds(inventoryIds: string[]): Promise<number> {
    if (inventoryIds.length === 0) {
      return 0;
    }
    const result = await this.prisma.inventoryItem.updateMany({
      where: { id: { in: inventoryIds }, status: 'HELD' },
      data: { status: 'AVAILABLE', holdExpiresAt: null },
    });
    return result.count;
  }

  async confirmHolds(inventoryIds: string[]): Promise<number> {
    if (inventoryIds.length === 0) {
      return 0;
    }
    const result = await this.prisma.inventoryItem.updateMany({
      where: { id: { in: inventoryIds }, status: 'HELD' },
      data: { status: 'BOOKED', holdExpiresAt: null },
    });
    return result.count;
  }

  async expireHolds(now: Date): Promise<number> {
    const result = await this.prisma.inventoryItem.updateMany({
      where: { status: 'HELD', holdExpiresAt: { lt: now } },
      data: { status: 'AVAILABLE', holdExpiresAt: null },
    });
    return result.count;
  }

  async getHeldSeat(inventoryId: string): Promise<PublicHeldSeat | null> {
    const row = await this.prisma.inventoryItem.findUnique({
      where: { id: inventoryId },
      select: {
        id: true,
        journeyId: true,
        holdExpiresAt: true,
        seat: {
          select: {
            seatNumber: true,
            seatType: true,
            coach: {
              select: {
                coachNumber: true,
                class: { select: { code: true, name: true } },
              },
            },
          },
        },
      },
    });
    if (!row) {
      return null;
    }
    return {
      id: row.id,
      journeyId: row.journeyId,
      seat: { seatNumber: row.seat.seatNumber, seatType: row.seat.seatType },
      coach: { coachNumber: row.seat.coach.coachNumber },
      class: { code: row.seat.coach.class.code, name: row.seat.coach.class.name },
      expiresAt: row.holdExpiresAt,
    };
  }

  async getClassIdByCode(classCode: string): Promise<string | null> {
    const row = await this.prisma.coachClass.findUnique({
      where: { code: classCode },
      select: { id: true },
    });
    return row?.id ?? null;
  }
}
