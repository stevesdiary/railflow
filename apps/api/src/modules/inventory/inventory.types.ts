export interface PublicAvailabilitySummary {
  journeyId: string;
  class: { code: string; name: string } | null;
  counts: {
    available: number;
    held: number;
    booked: number;
  };
  total: number;
}

export interface SeatCandidate {
  inventoryId: string;
  seatId: string;
  seatNumber: string;
  seatType: string;
  coachNumber: string;
  classCode: string;
  className: string;
  position: number | null;
}

export interface PublicHeldSeat {
  id: string;
  journeyId: string;
  seat: { seatNumber: string; seatType: string };
  coach: { coachNumber: string };
  class: { code: string; name: string };
  expiresAt: Date | null;
}

export type PublicSeatStatus = 'AVAILABLE' | 'HELD' | 'BOOKED' | 'CANCELLED' | 'MAINTENANCE';

export interface PublicSeatMapSeat {
  id: string;
  seatNumber: string;
  seatType: string;
  position: number | null;
  status: PublicSeatStatus;
}

export interface PublicCoachSeatMap {
  id: string;
  coachNumber: string;
  capacity: number;
  class: { code: string; name: string };
  seats: PublicSeatMapSeat[];
}

export interface PublicSeatMap {
  journeyId: string;
  train: {
    id: string;
    number: string;
    name: string;
    type: string;
  };
  coaches: PublicCoachSeatMap[];
}

export interface SeatMapRow {
  journeyId: string;
  train: {
    id: string;
    number: string;
    name: string;
    type: string;
    coaches: Array<{
      id: string;
      coachNumber: string;
      capacity: number;
      class: { code: string; name: string };
      seats: Array<{
        id: string;
        seatNumber: string;
        seatType: string;
        position: number | null;
        status: string;
      }>;
    }>;
  };
  inventory: Array<{ seatId: string; status: string }>;
}

export interface InventoryRepository {
  getJourney(journeyId: string): Promise<{ id: string; status: string } | null>;
  getAvailability(journeyId: string, classId?: string): Promise<PublicAvailabilitySummary>;
  getSeatMap(journeyId: string): Promise<SeatMapRow | null>;
  findAvailableSeats(
    journeyId: string,
    classId: string,
    limit: number,
    preferredSeatNumbers?: string[],
    excludeInventoryIds?: string[],
  ): Promise<SeatCandidate[]>;
  holdSeats(inventoryIds: string[], holdExpiresAt: Date): Promise<number>;
  releaseHolds(inventoryIds: string[]): Promise<number>;
  confirmHolds(inventoryIds: string[]): Promise<number>;
  expireHolds(now: Date): Promise<number>;
  getHeldSeat(inventoryId: string): Promise<PublicHeldSeat | null>;
  getClassIdByCode(classCode: string): Promise<string | null>;
}
