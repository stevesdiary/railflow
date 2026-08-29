import { Prisma } from '../../generated/prisma/client.js';
import type { PrismaClient } from '../../generated/prisma/client.js';
import type {
  BookingDetailRow,
  BookingRepository,
  CancelOutcome,
  CreateBookingRecordInput,
  CreateBookingResult,
  FareRow,
  HeldSeatRow,
  JourneyContextRow,
  StoredIdempotentResponse,
} from '../../modules/booking/booking.types.js';

const CANCELLABLE_STATUSES = [
  'INITIATED',
  'SEATS_HELD',
  'PAYMENT_PENDING',
  'PAYMENT_FAILED',
  'PAYMENT_SUCCESS',
  'CONFIRMED',
] as const;

const detailSelect = {
  bookingReference: true,
  pnr: true,
  status: true,
  totalAmount: true,
  currency: true,
  createdAt: true,
  expiresAt: true,
  journey: {
    select: {
      id: true,
      journeyDate: true,
      train: { select: { number: true, name: true } },
    },
  },
  fromStation: { select: { code: true, name: true } },
  toStation: { select: { code: true, name: true } },
  passengers: {
    orderBy: { createdAt: 'asc' as const },
    select: {
      id: true,
      name: true,
      age: true,
      gender: true,
      documentType: true,
      documentReference: true,
    },
  },
  seats: {
    orderBy: { createdAt: 'asc' as const },
    select: {
      id: true,
      allocationType: true,
      status: true,
      passengerId: true,
      inventory: {
        select: {
          seat: {
            select: {
              seatNumber: true,
              coach: {
                select: {
                  coachNumber: true,
                  class: { select: { code: true, name: true } },
                },
              },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.BookingSelect;

type DetailPayload = Prisma.BookingGetPayload<{ select: typeof detailSelect }>;

function classifyUniqueError(err: unknown): 'pnr' | 'reference' | 'idempotency' | null {
  if (!(err instanceof Prisma.PrismaClientKnownRequestError) || err.code !== 'P2002') {
    return null;
  }
  const target = (err.meta as { target?: string[] | string } | null)?.target;
  const fields = Array.isArray(target) ? target.join(',') : String(target ?? '');
  if (fields.includes('pnr')) {
    return 'pnr';
  }
  if (fields.includes('bookingReference')) {
    return 'reference';
  }
  return 'idempotency';
}

function mapDetail(booking: DetailPayload): BookingDetailRow {
  return {
    reference: booking.bookingReference,
    pnr: booking.pnr,
    status: booking.status,
    totalAmount: booking.totalAmount,
    currency: booking.currency,
    createdAt: booking.createdAt,
    expiresAt: booking.expiresAt,
    journeyId: booking.journey.id,
    journeyDate: booking.journey.journeyDate,
    trainNumber: booking.journey.train.number,
    trainName: booking.journey.train.name,
    fromCode: booking.fromStation.code,
    fromName: booking.fromStation.name,
    toCode: booking.toStation.code,
    toName: booking.toStation.name,
    passengers: booking.passengers.map((passenger) => ({
      id: passenger.id,
      name: passenger.name,
      age: passenger.age,
      gender: passenger.gender,
      documentType: passenger.documentType,
      documentReference: passenger.documentReference,
    })),
    seats: booking.seats.map((seat) => ({
      id: seat.id,
      seatNumber: seat.inventory.seat.seatNumber,
      coachNumber: seat.inventory.seat.coach.coachNumber,
      classCode: seat.inventory.seat.coach.class.code,
      className: seat.inventory.seat.coach.class.name,
      allocationType: seat.allocationType,
      status: seat.status,
      passengerId: seat.passengerId,
    })),
  };
}

export class PrismaBookingRepository implements BookingRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getJourneyContext(journeyId: string): Promise<JourneyContextRow | null> {
    const journey = await this.prisma.journey.findUnique({
      where: { id: journeyId },
      select: {
        id: true,
        status: true,
        journeyDate: true,
        train: {
          select: {
            number: true,
            name: true,
            stops: {
              orderBy: { sequence: 'asc' },
              select: {
                sequence: true,
                station: { select: { code: true, name: true } },
              },
            },
          },
        },
      },
    });
    if (!journey) {
      return null;
    }
    return {
      id: journey.id,
      status: journey.status,
      journeyDate: journey.journeyDate,
      train: { number: journey.train.number, name: journey.train.name },
      stops: journey.train.stops.map((stop) => ({
        stationCode: stop.station.code,
        stationName: stop.station.name,
        sequence: stop.sequence,
      })),
    };
  }

  async findFare(
    fromStationCode: string,
    toStationCode: string,
    classCode: string,
  ): Promise<FareRow | null> {
    return this.prisma.fare.findFirst({
      where: {
        status: 'ACTIVE',
        class: { code: classCode },
        fromStation: { code: fromStationCode },
        toStation: { code: toStationCode },
      },
      select: { amount: true, currency: true },
    });
  }

  async getHeldSeats(journeyId: string, inventoryIds: string[]): Promise<HeldSeatRow[]> {
    if (inventoryIds.length === 0) {
      return [];
    }
    const rows = await this.prisma.inventoryItem.findMany({
      where: { id: { in: inventoryIds }, journeyId, status: 'HELD' },
      select: {
        id: true,
        holdExpiresAt: true,
        seat: {
          select: {
            seatNumber: true,
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
    return rows.map((row) => ({
      id: row.id,
      holdExpiresAt: row.holdExpiresAt,
      seatNumber: row.seat.seatNumber,
      coachNumber: row.seat.coach.coachNumber,
      classCode: row.seat.coach.class.code,
      className: row.seat.coach.class.name,
    }));
  }

  async extendHolds(inventoryIds: string[], expiresAt: Date): Promise<number> {
    if (inventoryIds.length === 0) {
      return 0;
    }
    const result = await this.prisma.inventoryItem.updateMany({
      where: { id: { in: inventoryIds }, status: 'HELD' },
      data: { holdExpiresAt: expiresAt },
    });
    return result.count;
  }

  async findIdempotentResponse(
    userId: string,
    key: string,
  ): Promise<StoredIdempotentResponse | null> {
    const row = await this.prisma.idempotencyKey.findUnique({
      where: { userId_key: { userId, key } },
      select: { responseStatus: true, responseBody: true },
    });
    return row;
  }

  async storeResponse(
    userId: string,
    key: string,
    responseStatus: number,
    responseBody: unknown,
  ): Promise<void> {
    await this.prisma.idempotencyKey.update({
      where: { userId_key: { userId, key } },
      data: {
        responseStatus,
        responseBody: responseBody as Prisma.InputJsonValue,
      },
    });
  }

  async createBooking(input: CreateBookingRecordInput): Promise<CreateBookingResult> {
    try {
      const booking = await this.prisma.$transaction(async (tx) => {
        const fromStation = await tx.station.findUnique({
          where: { code: input.fromStationCode },
          select: { id: true },
        });
        const toStation = await tx.station.findUnique({
          where: { code: input.toStationCode },
          select: { id: true },
        });
        if (!fromStation || !toStation) {
          throw new Error('Route stations not found');
        }

        if (input.idempotencyKey) {
          await tx.idempotencyKey.create({
            data: {
              key: input.idempotencyKey,
              userId: input.userId,
              responseStatus: 201,
              responseBody: Prisma.JsonNull,
            },
          });
        }

        const created = await tx.booking.create({
          data: {
            bookingReference: input.bookingReference,
            pnr: input.pnr,
            userId: input.userId,
            journeyId: input.journeyId,
            fromStationId: fromStation.id,
            toStationId: toStation.id,
            quotaCode: input.quotaCode,
            status: 'SEATS_HELD',
            totalAmount: input.totalAmount,
            currency: input.currency,
            expiresAt: input.expiresAt,
          },
          select: { id: true, bookingReference: true, pnr: true },
        });

        const passengers = [];
        for (const passenger of input.passengers) {
          passengers.push(
            await tx.bookingPassenger.create({
              data: {
                bookingId: created.id,
                name: passenger.name,
                age: passenger.age,
                gender: passenger.gender as never,
                documentType: passenger.documentType ?? null,
                documentReference: passenger.documentReference ?? null,
              },
              select: { id: true },
            }),
          );
        }

        for (const [index, inventoryItemId] of input.holdIds.entries()) {
          await tx.bookingSeat.create({
            data: {
              bookingId: created.id,
              inventoryItemId,
              passengerId: passengers[index]?.id ?? null,
              allocationType: 'CONFIRMED',
              status: 'HELD',
            },
          });
        }

        if (input.idempotencyKey) {
          await tx.idempotencyKey.update({
            where: { userId_key: { userId: input.userId, key: input.idempotencyKey } },
            data: { bookingId: created.id },
          });
        }
        return created;
      });
      return {
        ok: true,
        bookingId: booking.id,
        bookingReference: booking.bookingReference,
        pnr: booking.pnr,
      };
    } catch (err) {
      const conflict = classifyUniqueError(err);
      if (conflict) {
        return { ok: false, conflict };
      }
      throw err;
    }
  }

  async getBookingDetail(reference: string, userId: string): Promise<BookingDetailRow | null> {
    const booking = await this.prisma.booking.findFirst({
      where: { bookingReference: reference, userId },
      select: detailSelect,
    });
    return booking ? mapDetail(booking) : null;
  }

  async listBookings(userId: string): Promise<BookingDetailRow[]> {
    const bookings = await this.prisma.booking.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: detailSelect,
    });
    return bookings.map(mapDetail);
  }

  async cancelBooking(reference: string, userId: string): Promise<CancelOutcome> {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.booking.findFirst({
        where: { bookingReference: reference, userId },
        select: { id: true, status: true },
      });
      if (!existing) {
        return 'NOT_FOUND';
      }
      if (!CANCELLABLE_STATUSES.includes(existing.status as (typeof CANCELLABLE_STATUSES)[number])) {
        return 'INVALID_STATE';
      }

      const updated = await tx.booking.updateMany({
        where: { id: existing.id, status: existing.status },
        data: { status: 'CANCELLED' },
      });
      if (updated.count !== 1) {
        return 'INVALID_STATE';
      }

      await tx.bookingSeat.updateMany({
        where: { bookingId: existing.id, status: { not: 'CANCELLED' } },
        data: { status: 'CANCELLED' },
      });

      const seatRows = await tx.bookingSeat.findMany({
        where: { bookingId: existing.id },
        select: { inventoryItemId: true },
      });
      const inventoryIds = seatRows.map((row) => row.inventoryItemId);
      if (inventoryIds.length > 0) {
        await tx.inventoryItem.updateMany({
          where: { id: { in: inventoryIds }, status: { in: ['HELD', 'BOOKED'] } },
          data: { status: 'AVAILABLE', holdExpiresAt: null },
        });
      }
      return 'CANCELLED';
    });
  }
}
