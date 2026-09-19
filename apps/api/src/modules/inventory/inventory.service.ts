import { ConflictError, NotFoundError, ValidationError } from '../../common/errors/app-error.js';
import type {
  InventoryRepository,
  PublicAvailabilitySummary,
  PublicHeldSeat,
  PublicSeatMap,
  PublicSeatStatus,
  SeatMapRow,
} from './inventory.types.js';

const CODE_LENGTH_LIMIT = 10;
const MAX_PASSENGERS_PER_HOLD = 10;

export interface HoldSeatsInput {
  journeyId: string;
  classCode: string;
  count: number;
  preferredSeatNumbers?: string[];
}

export class InventoryService {
  constructor(
    private readonly repository: InventoryRepository,
    private readonly defaultHoldTtlSeconds: number,
  ) {}

  async getAvailability(journeyId: string, classCode?: string): Promise<PublicAvailabilitySummary> {
    const journey = await this.requireJourney(journeyId);
    if (journey.status !== 'SCHEDULED') {
      throw new ConflictError('This journey is not accepting reservations');
    }

    await this.repository.expireHolds(new Date());

    const classId = classCode ? await this.classIdOrThrow(classCode) : undefined;
    return this.repository.getAvailability(journeyId, classId);
  }

  async getSeatMap(journeyId: string): Promise<PublicSeatMap> {
    const journey = await this.requireJourney(journeyId);
    if (journey.status !== 'SCHEDULED') {
      throw new ConflictError('This journey is not accepting reservations');
    }

    await this.repository.expireHolds(new Date());

    const row = await this.repository.getSeatMap(journeyId);
    if (!row) {
      throw new NotFoundError('Journey not found');
    }
    return this.buildSeatMap(row);
  }

  async holdSeats(
    input: HoldSeatsInput,
    userId: string,
    holdTtlSeconds?: number,
  ): Promise<{
    heldSeats: PublicHeldSeat[];
    expiresAt: Date;
  }> {
    const journey = await this.requireJourney(input.journeyId);
    if (journey.status !== 'SCHEDULED') {
      throw new ConflictError('This journey is not accepting reservations');
    }

    const count = this.validateCount(input.count);
    const classId = await this.classIdOrThrow(input.classCode);
    const preferred = this.validateSeatNumbers(input.preferredSeatNumbers);
    const ttlSeconds =
      holdTtlSeconds && holdTtlSeconds > 0 ? holdTtlSeconds : this.defaultHoldTtlSeconds;

    const heldIds: string[] = [];
    if (preferred.length > 0) {
      const preferredCandidates = await this.repository.findAvailableSeats(
        journey.id,
        classId,
        count,
        preferred,
      );
      heldIds.push(...preferredCandidates.map((seat) => seat.inventoryId));
    }
    if (heldIds.length < count) {
      const fallback = await this.repository.findAvailableSeats(
        journey.id,
        classId,
        count - heldIds.length,
        undefined,
        heldIds,
      );
      heldIds.push(...fallback.map((seat) => seat.inventoryId));
    }

    if (heldIds.length < count) {
      throw new ConflictError(
        `Only ${heldIds.length} seat(s) available for ${input.classCode} on this journey`,
      );
    }

    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
    const heldCount = await this.repository.holdSeats(heldIds, expiresAt, userId);
    if (heldCount < count) {
      throw new ConflictError('Seats were taken by another request; please retry');
    }

    const heldSeats: PublicHeldSeat[] = [];
    for (const id of heldIds) {
      const seat = await this.repository.getHeldSeat(id);
      if (seat) {
        heldSeats.push(seat);
      }
    }

    return { heldSeats, expiresAt };
  }

  async releaseHolds(holdIds: string[], userId?: string): Promise<number> {
    const ids = [...new Set((holdIds ?? []).filter((id) => typeof id === 'string' && id !== ''))];
    if (ids.length === 0) {
      return 0;
    }
    return this.repository.releaseHolds(ids, userId);
  }

  async confirmHolds(holdIds: string[], userId: string): Promise<number> {
    const ids = [...new Set((holdIds ?? []).filter((id) => typeof id === 'string' && id !== ''))];
    if (ids.length === 0) {
      throw new ValidationError('At least one held seat is required');
    }
    const confirmed = await this.repository.confirmHolds(ids, userId);
    if (confirmed !== ids.length) {
      throw new ConflictError('One or more seats are no longer held; please retry');
    }
    return confirmed;
  }

  async expireHolds(): Promise<number> {
    return this.repository.expireHolds(new Date());
  }

  private buildSeatMap(row: SeatMapRow): PublicSeatMap {
    const inventoryBySeat = new Map(row.inventory.map((item) => [item.seatId, item.status]));

    return {
      journeyId: row.journeyId,
      train: {
        id: row.train.id,
        number: row.train.number,
        name: row.train.name,
        type: row.train.type,
      },
      coaches: row.train.coaches.map((coach) => ({
        id: coach.id,
        coachNumber: coach.coachNumber,
        capacity: coach.capacity,
        class: coach.class,
        seats: coach.seats.map((seat) => ({
          id: seat.id,
          seatNumber: seat.seatNumber,
          seatType: seat.seatType,
          position: seat.position,
          status: this.effectiveStatus(seat.status, inventoryBySeat.get(seat.id)),
        })),
      })),
    };
  }

  private effectiveStatus(
    physicalStatus: string,
    inventoryStatus: string | undefined,
  ): PublicSeatStatus {
    if (
      inventoryStatus === 'AVAILABLE' ||
      inventoryStatus === 'HELD' ||
      inventoryStatus === 'BOOKED'
    ) {
      return inventoryStatus;
    }
    if (physicalStatus === 'MAINTENANCE' || physicalStatus === 'CANCELLED') {
      return physicalStatus;
    }
    return 'AVAILABLE';
  }

  private validateCount(count: number): number {
    const parsed = Number(count);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_PASSENGERS_PER_HOLD) {
      throw new ValidationError(
        `count must be an integer between 1 and ${MAX_PASSENGERS_PER_HOLD}`,
      );
    }
    return parsed;
  }

  private validateSeatNumbers(seatNumbers?: string[]): string[] {
    const value = seatNumbers ?? [];
    if (!Array.isArray(value)) {
      throw new ValidationError('preferredSeatNumbers must be an array');
    }
    const normalized: string[] = [];
    for (const seatNumber of value) {
      const trimmed = String(seatNumber).trim().toUpperCase();
      if (!trimmed) {
        throw new ValidationError('preferredSeatNumbers contains an empty value');
      }
      if (trimmed.length > 16) {
        throw new ValidationError('preferredSeatNumbers entries are too long');
      }
      normalized.push(trimmed);
    }
    return normalized;
  }

  private async classIdOrThrow(classCode: string): Promise<string> {
    const normalized = classCode?.trim().toUpperCase() ?? '';
    if (!normalized) {
      throw new ValidationError('Missing required field: classCode');
    }
    if (normalized.length > CODE_LENGTH_LIMIT) {
      throw new ValidationError('classCode is too long');
    }
    const classId = await this.repository.getClassIdByCode(normalized);
    if (!classId) {
      throw new NotFoundError(`Class ${normalized} not found`);
    }
    return classId;
  }

  private async requireJourney(journeyId: string): Promise<{ id: string; status: string }> {
    const journey = await this.repository.getJourney(journeyId);
    if (!journey) {
      throw new NotFoundError('Journey not found');
    }
    return journey;
  }
}
