export const BOOKING_STATUSES = [
  'INITIATED',
  'SEATS_HELD',
  'PAYMENT_PENDING',
  'PAYMENT_FAILED',
  'PAYMENT_SUCCESS',
  'CONFIRMED',
  'CANCELLED',
  'COMPLETED',
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const TERMINAL_BOOKING_STATUSES: readonly BookingStatus[] = ['CANCELLED', 'COMPLETED'];

const BOOKING_TRANSITIONS: Record<BookingStatus, readonly BookingStatus[]> = {
  INITIATED: ['SEATS_HELD', 'CANCELLED'],
  SEATS_HELD: ['PAYMENT_PENDING', 'CANCELLED'],
  PAYMENT_PENDING: ['PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'CANCELLED'],
  PAYMENT_FAILED: ['PAYMENT_PENDING', 'CANCELLED'],
  PAYMENT_SUCCESS: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
};

export function canTransition(from: BookingStatus, to: BookingStatus): boolean {
  return BOOKING_TRANSITIONS[from].includes(to);
}

export const CANCELLABLE_STATUSES: readonly BookingStatus[] = (
  Object.keys(BOOKING_TRANSITIONS) as BookingStatus[]
).filter((status) => canTransition(status, 'CANCELLED'));

export interface PublicBookingRoute {
  from: { code: string; name: string };
  to: { code: string; name: string };
}

export interface PublicBookingJourney {
  id: string;
  journeyDate: string;
  train: { number: string; name: string };
}

export interface PublicBookingPassenger {
  id: string;
  name: string;
  age: number;
  gender: string;
  documentType: string | null;
  documentReference: string | null;
}

export interface PublicBookingSeat {
  id: string;
  seatNumber: string;
  coachNumber: string;
  class: { code: string; name: string };
  allocationType: string;
  status: string;
  passengerId: string | null;
}

export interface PublicBookingSummary {
  reference: string;
  pnr: string | null;
  status: BookingStatus;
  totalAmount: number;
  currency: string;
  createdAt: string;
  expiresAt: string | null;
  journey: PublicBookingJourney;
  route: PublicBookingRoute;
}

export interface PublicBookingDetail extends PublicBookingSummary {
  passengers: PublicBookingPassenger[];
  seats: PublicBookingSeat[];
}

export interface PassengerInput {
  name: string;
  age: number;
  gender: string;
  documentType?: string;
  documentReference?: string;
}

export interface CreateBookingInput {
  journeyId: string;
  classCode: string;
  fromStationCode: string;
  toStationCode: string;
  holdIds: string[];
  passengers: PassengerInput[];
}

export interface JourneyContextRow {
  id: string;
  status: string;
  journeyDate: Date;
  train: { number: string; name: string };
  stops: Array<{ stationCode: string; stationName: string; sequence: number }>;
}

export interface HeldSeatRow {
  id: string;
  holdExpiresAt: Date | null;
  seatNumber: string;
  coachNumber: string;
  classCode: string;
  className: string;
}

export interface FareRow {
  amount: number;
  currency: string;
}

export interface CreateBookingRecordInput {
  userId: string;
  bookingReference: string;
  pnr: string | null;
  journeyId: string;
  fromStationCode: string;
  toStationCode: string;
  quotaCode: string | null;
  totalAmount: number;
  currency: string;
  expiresAt: Date;
  holdIds: string[];
  passengers: PassengerInput[];
  idempotencyKey: string | null;
}

export type CreateBookingConflict = 'pnr' | 'reference' | 'idempotency';

export type CreateBookingResult =
  | { ok: true; bookingId: string; bookingReference: string; pnr: string | null }
  | { ok: false; conflict: CreateBookingConflict };

export interface StoredIdempotentResponse {
  responseStatus: number;
  responseBody: unknown;
}

export interface BookingDetailRow {
  reference: string;
  pnr: string | null;
  status: BookingStatus;
  totalAmount: number;
  currency: string;
  createdAt: Date;
  expiresAt: Date | null;
  journeyId: string;
  journeyDate: Date;
  trainNumber: string;
  trainName: string;
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  passengers: PublicBookingPassenger[];
  seats: Array<{
    id: string;
    seatNumber: string;
    coachNumber: string;
    classCode: string;
    className: string;
    allocationType: string;
    status: string;
    passengerId: string | null;
  }>;
}

export type CancelOutcome = 'CANCELLED' | 'NOT_FOUND' | 'INVALID_STATE';

export interface BookingRepository {
  getJourneyContext(journeyId: string): Promise<JourneyContextRow | null>;
  findFare(
    fromStationCode: string,
    toStationCode: string,
    classCode: string,
  ): Promise<FareRow | null>;
  getHeldSeats(journeyId: string, inventoryIds: string[]): Promise<HeldSeatRow[]>;
  extendHolds(inventoryIds: string[], expiresAt: Date): Promise<number>;
  findIdempotentResponse(
    userId: string,
    key: string,
  ): Promise<StoredIdempotentResponse | null>;
  createBooking(input: CreateBookingRecordInput): Promise<CreateBookingResult>;
  getBookingDetail(reference: string, userId: string): Promise<BookingDetailRow | null>;
  listBookings(userId: string): Promise<BookingDetailRow[]>;
  cancelBooking(reference: string, userId: string): Promise<CancelOutcome>;
}
