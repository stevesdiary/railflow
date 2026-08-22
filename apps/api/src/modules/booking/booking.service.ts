import { randomInt } from 'node:crypto';
import {
  ConflictError,
  InternalError,
  NotFoundError,
  ValidationError,
} from '../../common/errors/app-error.js';
import type {
  BookingDetailRow,
  BookingRepository,
  CreateBookingInput,
  PublicBookingDetail,
  PublicBookingSummary,
} from './booking.types.js';
import {
  CANCELLABLE_STATUSES,
  canTransition,
  type BookingStatus,
} from './booking.types.js';

const MAX_PASSENGERS = 6;
const MAX_HOLDS = 10;
const CODE_LENGTH_LIMIT = 10;
const NAME_LENGTH_LIMIT = 80;
const DOCUMENT_LENGTH_LIMIT = 40;
const GENDERS = new Set(['MALE', 'FEMALE', 'OTHER']);
const PNR_ATTEMPTS = 5;

export interface CreateBookingResultPayload {
  booking: PublicBookingDetail;
  replayed: boolean;
}

function generatePnr(): string {
  return String(randomInt(1_000_000_000, 10_000_000_000));
}

const REFERENCE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateBookingReference(): string {
  let suffix = '';
  for (let i = 0; i < 8; i += 1) {
    suffix += REFERENCE_ALPHABET[randomInt(0, REFERENCE_ALPHABET.length)];
  }
  return `RF${suffix}`;
}

export class BookingService {
  constructor(private readonly repository: BookingRepository) {}

  async createBooking(
    userId: string,
    input: CreateBookingInput,
    holdTtlSeconds: number,
    idempotencyKey: string | null,
  ): Promise<CreateBookingResultPayload> {
    const key = this.validateIdempotencyKey(idempotencyKey);
    if (key) {
      const stored = await this.repository.findIdempotentResponse(userId, key);
      if (stored) {
        if (stored.responseBody === null || stored.responseBody === undefined) {
          throw new ConflictError('This request is already being processed');
        }
        return { booking: stored.responseBody as PublicBookingDetail, replayed: true };
      }
    }

    const passengers = this.validatePassengers(input.passengers);
    const holdIds = this.validateHoldIds(input.holdIds, passengers.length);
    const codes = this.validateCodes(input);
    const now = new Date();

    const journey = await this.repository.getJourneyContext(input.journeyId);
    if (!journey || journey.status !== 'SCHEDULED') {
      throw new NotFoundError('Journey not found');
    }
    const originIndex = journey.stops.findIndex((stop) => stop.stationCode === codes.fromCode);
    const destinationIndex = journey.stops.findIndex(
      (stop) => stop.stationCode === codes.toCode,
    );
    if (originIndex === -1 || destinationIndex === -1 || originIndex >= destinationIndex) {
      throw new ValidationError('Route is not served by this train');
    }
    const fromStop = journey.stops[originIndex];
    const toStop = journey.stops[destinationIndex];

    const fare = await this.repository.findFare(codes.fromCode, codes.toCode, codes.classCode);
    if (!fare) {
      throw new NotFoundError(`No fare found for ${codes.fromCode} → ${codes.toCode}`);
    }
    const totalAmount = fare.amount * passengers.length;

    const heldSeats = await this.repository.getHeldSeats(input.journeyId, holdIds);
    if (heldSeats.length !== holdIds.length) {
      throw new ConflictError('One or more held seats are invalid for this journey');
    }
    for (const seat of heldSeats) {
      if (!seat.holdExpiresAt || seat.holdExpiresAt.getTime() <= now.getTime()) {
        throw new ConflictError('Your seat hold has expired; please select seats again');
      }
    }
    const expiresAt = new Date(now.getTime() + holdTtlSeconds * 1000);
    const extended = await this.repository.extendHolds(holdIds, expiresAt);
    if (extended !== holdIds.length) {
      throw new ConflictError('Your seat hold has expired; please select seats again');
    }

    let lastConflict: string | null = null;
    for (let attempt = 0; attempt < PNR_ATTEMPTS; attempt += 1) {
      const result = await this.repository.createBooking({
        userId,
        bookingReference: generateBookingReference(),
        pnr: generatePnr(),
        journeyId: input.journeyId,
        fromStationCode: codes.fromCode,
        toStationCode: codes.toCode,
        quotaCode: null,
        totalAmount,
        currency: fare.currency,
        expiresAt,
        holdIds,
        passengers,
        idempotencyKey: key,
      });
      if (result.ok) {
        const detail = await this.repository.getBookingDetail(result.bookingReference, userId);
        if (!detail) {
          throw new InternalError('Booking could not be loaded after creation');
        }
        const payload = this.toPublicDetail(detail);
        if (key) {
          await this.repository.storeResponse(userId, key, 201, payload);
        }
        return { booking: payload, replayed: false };
      }
      lastConflict = result.conflict;
      if (result.conflict === 'idempotency') {
        const stored = key ? await this.repository.findIdempotentResponse(userId, key) : null;
        if (stored && stored.responseBody !== null && stored.responseBody !== undefined) {
          return { booking: stored.responseBody as PublicBookingDetail, replayed: true };
        }
        throw new ConflictError('This request is already being processed');
      }
    }
    throw new InternalError(`Booking could not be created (${lastConflict ?? 'unknown'})`);
  }

  async getBooking(reference: string, userId: string): Promise<PublicBookingDetail> {
    const row = await this.repository.getBookingDetail(this.cleanReference(reference), userId);
    if (!row) {
      throw new NotFoundError('Booking not found');
    }
    return this.toPublicDetail(row);
  }

  async listBookings(userId: string): Promise<PublicBookingSummary[]> {
    const rows = await this.repository.listBookings(userId);
    return rows.map((row) => this.toPublicSummary(row));
  }

  async cancelBooking(reference: string, userId: string): Promise<PublicBookingDetail> {
    const cleanReference = this.cleanReference(reference);
    const outcome = await this.repository.cancelBooking(cleanReference, userId);
    if (outcome === 'NOT_FOUND') {
      throw new NotFoundError('Booking not found');
    }
    if (outcome === 'INVALID_STATE') {
      throw new ConflictError('This booking can no longer be cancelled');
    }
    const row = await this.repository.getBookingDetail(cleanReference, userId);
    if (!row) {
      throw new NotFoundError('Booking not found');
    }
    return this.toPublicDetail(row);
  }

  assertTransition(from: BookingStatus, to: BookingStatus): void {
    if (!canTransition(from, to)) {
      throw new ConflictError(`Cannot transition booking from ${from} to ${to}`);
    }
  }

  cancellableStatuses(): readonly BookingStatus[] {
    return CANCELLABLE_STATUSES;
  }

  private toPublicSummary(row: BookingDetailRow): PublicBookingSummary {
    return {
      reference: row.reference,
      pnr: row.pnr,
      status: row.status,
      totalAmount: row.totalAmount,
      currency: row.currency,
      createdAt: row.createdAt.toISOString(),
      expiresAt: row.expiresAt ? row.expiresAt.toISOString() : null,
      journey: {
        id: row.journeyId,
        journeyDate: row.journeyDate.toISOString().slice(0, 10),
        train: { number: row.trainNumber, name: row.trainName },
      },
      route: {
        from: { code: row.fromCode, name: row.fromName },
        to: { code: row.toCode, name: row.toName },
      },
    };
  }

  private toPublicDetail(row: BookingDetailRow): PublicBookingDetail {
    return {
      ...this.toPublicSummary(row),
      passengers: row.passengers,
      seats: row.seats.map((seat) => ({
        id: seat.id,
        seatNumber: seat.seatNumber,
        coachNumber: seat.coachNumber,
        class: { code: seat.classCode, name: seat.className },
        allocationType: seat.allocationType,
        status: seat.status,
        passengerId: seat.passengerId,
      })),
    };
  }

  private validateIdempotencyKey(key: string | null): string | null {
    if (key === null || key === undefined || key === '') {
      return null;
    }
    const trimmed = String(key).trim();
    if (!trimmed) {
      return null;
    }
    if (trimmed.length < 16 || trimmed.length > 128) {
      throw new ValidationError('Idempotency-Key must be between 16 and 128 characters');
    }
    return trimmed;
  }

  private validatePassengers(passengers: unknown): CreateBookingInput['passengers'] {
    if (!Array.isArray(passengers) || passengers.length < 1 || passengers.length > MAX_PASSENGERS) {
      throw new ValidationError(
        `passengers must be an array of 1 to ${MAX_PASSENGERS} entries`,
      );
    }
    return passengers.map((raw, index) => {
      const passenger = raw as Partial<CreateBookingInput['passengers'][number]>;
      const name = String(passenger.name ?? '').trim();
      if (!name || name.length > NAME_LENGTH_LIMIT) {
        throw new ValidationError(`passengers[${index}].name is required (max ${NAME_LENGTH_LIMIT})`);
      }
      const age = Number(passenger.age);
      if (!Number.isInteger(age) || age < 1 || age > 120) {
        throw new ValidationError(`passengers[${index}].age must be an integer between 1 and 120`);
      }
      const gender = String(passenger.gender ?? '').trim().toUpperCase();
      if (!GENDERS.has(gender)) {
        throw new ValidationError(`passengers[${index}].gender must be MALE, FEMALE, or OTHER`);
      }
      const documentType = passenger.documentType
        ? String(passenger.documentType).trim()
        : undefined;
      const documentReference = passenger.documentReference
        ? String(passenger.documentReference).trim()
        : undefined;
      if (documentType && documentType.length > DOCUMENT_LENGTH_LIMIT) {
        throw new ValidationError(`passengers[${index}].documentType is too long`);
      }
      if (documentReference && documentReference.length > DOCUMENT_LENGTH_LIMIT) {
        throw new ValidationError(`passengers[${index}].documentReference is too long`);
      }
      const hasDocumentType = Boolean(documentType);
      const hasDocumentReference = Boolean(documentReference);
      if (hasDocumentType !== hasDocumentReference) {
        throw new ValidationError(
          `passengers[${index}] must provide both documentType and documentReference`,
        );
      }
      return {
        name,
        age,
        gender,
        ...(documentType ? { documentType } : {}),
        ...(documentReference ? { documentReference } : {}),
      };
    });
  }

  private validateHoldIds(holdIds: unknown, passengerCount: number): string[] {
    if (!Array.isArray(holdIds) || holdIds.length < 1 || holdIds.length > MAX_HOLDS) {
      throw new ValidationError(`holdIds must be an array of 1 to ${MAX_HOLDS} ids`);
    }
    const ids = holdIds.map((id) => String(id ?? '').trim());
    if (ids.some((id) => !id)) {
      throw new ValidationError('holdIds contains an empty value');
    }
    if (new Set(ids).size !== ids.length) {
      throw new ValidationError('holdIds contains duplicates');
    }
    if (ids.length !== passengerCount) {
      throw new ValidationError('Each passenger needs exactly one held seat');
    }
    return ids;
  }

  private validateCodes(input: CreateBookingInput): {
    fromCode: string;
    toCode: string;
    classCode: string;
  } {
    const clean = (value: unknown, field: string): string => {
      const code = String(value ?? '').trim().toUpperCase();
      if (!code) {
        throw new ValidationError(`Missing required field: ${field}`);
      }
      if (code.length > CODE_LENGTH_LIMIT) {
        throw new ValidationError(`${field} is too long`);
      }
      return code;
    };
    const fromCode = clean(input.fromStationCode, 'fromStationCode');
    const toCode = clean(input.toStationCode, 'toStationCode');
    const classCode = clean(input.classCode, 'classCode');
    if (fromCode === toCode) {
      throw new ValidationError('Origin and destination must differ');
    }
    return { fromCode, toCode, classCode };
  }

  private cleanReference(reference: string): string {
    const cleaned = String(reference ?? '').trim().toUpperCase();
    if (!cleaned || cleaned.length > 20) {
      throw new ValidationError('Invalid booking reference');
    }
    return cleaned;
  }
}
