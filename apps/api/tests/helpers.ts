import { randomUUID } from 'node:crypto';
import type { FastifyInstance } from 'fastify';
import type { Env } from '@railflow/config';
import { loadConfig } from '@railflow/config';
import { createTestLogger } from '@railflow/testing';
import { buildApp } from '../src/app.js';
import type {
  AuthDependencies,
  EmailMessage,
  RefreshTokenStore,
  TokenService,
  UserRecord,
  UserRepository,
  VerificationTokenRecord,
  VerificationTokenStore,
} from '../src/modules/identity/auth.types.js';
import type {
  PublicClass,
  PublicFare,
  PublicQuota,
  PublicStation,
  PublicTrain,
  RailwayRepository,
} from '../src/modules/railway/railway.types.js';
import type {
  PublicSearchResult,
  SearchCache,
  SearchJourneyRow,
  SearchRepository,
} from '../src/modules/search/search.types.js';
import type { InventoryRepository } from '../src/modules/inventory/inventory.types.js';
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
} from '../src/modules/booking/booking.types.js';
import { hashToken } from '../src/modules/identity/tokens.js';

export function testConfig(overrides: Partial<Env> = {}): Env {
  return loadConfig({
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://railflow:railflow@localhost:5432/railflow_test',
      REDIS_URL: 'redis://localhost:6379/1',
      JWT_ACCESS_SECRET: 'test-access-secret-0123456789abcdef',
      JWT_REFRESH_SECRET: 'test-refresh-secret-0123456789abcdef',
      LOG_LEVEL: 'silent',
      ...Object.fromEntries(Object.entries(overrides).map(([key, value]) => [key, String(value)])),
    },
  });
}

export function createFakeTokenService(): TokenService {
  return {
    signAccessToken: (payload) => `fake.jwt.${payload.sub}`,
    verifyAccessToken: (token) => {
      const sub = token.split('.').pop() ?? 'missing';
      return { sub, email: `${sub}@test.local`, role: 'USER' };
    },
  };
}

export function createFakeRailwayRepository(): RailwayRepository {
  return {
    listStations: async () => [],
    getStationByCode: async () => null,
    listTrains: async () => [],
    getTrainByNumber: async () => null,
    listClasses: async () => [],
    listQuotas: async () => [],
    listFares: async () => [],
  };
}

export interface RailwayFixture {
  stations: PublicStation[];
  trains: PublicTrain[];
  classes: PublicClass[];
  quotas: PublicQuota[];
  fares: PublicFare[];
}

export function createSeededRailwayRepository(
  fixture: Partial<RailwayFixture> = {},
): RailwayRepository {
  const stations: PublicStation[] = [
    {
      id: 's1',
      code: 'LAG',
      name: 'Lagos (Iganmu)',
      city: 'Lagos',
      state: 'Lagos',
      latitude: '6.4698',
      longitude: '3.3628',
    },
    {
      id: 's2',
      code: 'IBADAN',
      name: 'Ibadan',
      city: 'Ibadan',
      state: 'Oyo',
      latitude: '7.3775',
      longitude: '3.9470',
    },
  ];
  const trains: PublicTrain[] = [
    {
      id: 't1',
      number: 'NRC-101',
      name: 'Lagos-Abuja Express',
      type: 'INTERCITY',
      status: 'ACTIVE',
      stops: [
        {
          id: 'st1',
          sequence: 1,
          arrivalTime: null,
          departureTime: '08:00',
          dayOffset: 0,
          station: { code: 'LAG', name: 'Lagos (Iganmu)', city: 'Lagos' },
        },
        {
          id: 'st2',
          sequence: 2,
          arrivalTime: '11:30',
          departureTime: '11:45',
          dayOffset: 0,
          station: { code: 'IBADAN', name: 'Ibadan', city: 'Ibadan' },
        },
      ],
      coaches: [
        { id: 'c1', coachNumber: 'C1', capacity: 64, class: { code: 'STD', name: 'Standard' } },
      ],
    },
  ];
  const classes: PublicClass[] = [
    { id: 'cl1', code: 'STD', name: 'Standard', description: 'Standard coach' },
  ];
  const quotas: PublicQuota[] = [
    { id: 'q1', code: 'GENERAL', name: 'General', description: 'General quota', priority: 0 },
  ];
  const fares: PublicFare[] = [
    {
      id: 'f1',
      from: { code: 'LAG', name: 'Lagos (Iganmu)', city: 'Lagos' },
      to: { code: 'IBADAN', name: 'Ibadan', city: 'Ibadan' },
      class: { code: 'STD', name: 'Standard' },
      amount: 3500,
      currency: 'NGN',
    },
  ];

  const data = {
    stations: fixture.stations ?? stations,
    trains: fixture.trains ?? trains,
    classes: fixture.classes ?? classes,
    quotas: fixture.quotas ?? quotas,
    fares: fixture.fares ?? fares,
  };

  return {
    listStations: async (query) => {
      if (!query) return data.stations;
      const needle = query.toLowerCase();
      return data.stations.filter(
        (s) =>
          s.code.toLowerCase().includes(needle) ||
          s.name.toLowerCase().includes(needle) ||
          s.city.toLowerCase().includes(needle),
      );
    },
    getStationByCode: async (code) => data.stations.find((s) => s.code === code) ?? null,
    listTrains: async () =>
      data.trains.map((train) => {
        const origin = train.stops[0];
        const destination = train.stops[train.stops.length - 1];
        return {
          id: train.id,
          number: train.number,
          name: train.name,
          type: train.type,
          status: train.status,
          stopCount: train.stops.length,
          origin: origin ? { code: origin.station.code, name: origin.station.name } : null,
          destination: destination
            ? { code: destination.station.code, name: destination.station.name }
            : null,
        };
      }),
    getTrainByNumber: async (number) => data.trains.find((t) => t.number === number) ?? null,
    listClasses: async () => data.classes,
    listQuotas: async () => data.quotas,
    listFares: async (from, to, classCode) =>
      data.fares.filter(
        (f) =>
          (!from || f.from.code === from) &&
          (!to || f.to.code === to) &&
          (!classCode || f.class.code === classCode),
      ),
  };
}

export interface TestAppOptions {
  config?: Env;
  checkDatabase?: () => Promise<boolean>;
  identity?: AuthDependencies | ((app: FastifyInstance) => AuthDependencies);
  railway?: RailwayRepository;
  search?: { repository?: SearchRepository; cache?: SearchCache; cacheTtlSeconds?: number };
  inventory?: { repository?: InventoryRepository; holdTtlSeconds?: number };
  booking?: { repository?: BookingRepository; holdTtlSeconds?: number };
  infra?: MemoryAuthInfra;
}

export function buildTestApp(options: TestAppOptions = {}): FastifyInstance {
  const infra = options.infra ?? new MemoryAuthInfra();
  return buildApp({
    config: options.config ?? testConfig(),
    checkDatabase: options.checkDatabase ?? (async () => true),
    identity: options.identity ?? (() => infra.deps()),
    railway: { repository: options.railway ?? createFakeRailwayRepository() },
    search: {
      repository: options.search?.repository ?? createFakeSearchRepository(),
      cache: options.search?.cache ?? createMemorySearchCache(),
      cacheTtlSeconds: options.search?.cacheTtlSeconds ?? 300,
    },
    inventory: {
      repository: options.inventory?.repository ?? createFakeInventoryRepository(),
      holdTtlSeconds: options.inventory?.holdTtlSeconds ?? 600,
    },
    booking: {
      repository: options.booking?.repository ?? createFakeBookingRepository(),
      holdTtlSeconds: options.booking?.holdTtlSeconds ??
        options.inventory?.holdTtlSeconds ?? 600,
    },
  });
}

export function createFakeInventoryRepository(): InventoryRepository {
  return {
    getJourney: async () => null,
    getAvailability: async () => ({
      journeyId: '',
      class: null,
      counts: { available: 0, held: 0, booked: 0 },
      total: 0,
    }),
    getSeatMap: async () => null,
    findAvailableSeats: async () => [],
    holdSeats: async () => 0,
    releaseHolds: async () => 0,
    confirmHolds: async () => 0,
    expireHolds: async () => 0,
    getHeldSeat: async () => null,
    getClassIdByCode: async () => null,
  };
}

export function createFakeSearchRepository(): SearchRepository {
  return { searchJourneys: async () => [] };
}

export function createSeededSearchRepository(rows: SearchJourneyRow[] = []): SearchRepository {
  return { searchJourneys: async () => rows };
}

export function createMemorySearchCache(): SearchCache {
  const store = new Map<string, PublicSearchResult>();
  return {
    get: async (key) => store.get(key) ?? null,
    set: async (key, value) => {
      store.set(key, value);
    },
  };
}

export class MemoryAuthInfra {
  readonly users = new Map<string, UserRecord>();
  readonly refreshTokens = new Map<string, string>();
  readonly verificationTokens = new Map<string, VerificationTokenRecord>();
  readonly mail: EmailMessage[] = [];

  readonly userRepository: UserRepository = {
    create: async (input) => {
      const now = new Date();
      const user: UserRecord = {
        id: randomUUID(),
        email: input.email,
        passwordHash: input.passwordHash,
        firstName: input.firstName,
        lastName: input.lastName,
        role: 'USER',
        status: 'PENDING_VERIFICATION',
        emailVerifiedAt: null,
        createdAt: now,
        updatedAt: now,
      };
      this.users.set(user.id, user);
      return user;
    },
    findByEmail: async (email) =>
      [...this.users.values()].find((user) => user.email === email) ?? null,
    findById: async (id) => this.users.get(id) ?? null,
    markEmailVerified: async (id) => {
      const user = this.users.get(id);
      if (!user) {
        throw new Error('user not found');
      }
      const updated: UserRecord = {
        ...user,
        emailVerifiedAt: new Date(),
        status: 'ACTIVE',
        updatedAt: new Date(),
      };
      this.users.set(id, updated);
      return updated;
    },
  };

  readonly refreshTokenStore: RefreshTokenStore = {
    save: async (tokenHash, userId, _ttlSeconds) => {
      this.refreshTokens.set(tokenHash, userId);
    },
    findUserId: async (tokenHash) => this.refreshTokens.get(tokenHash) ?? null,
    delete: async (tokenHash) => {
      this.refreshTokens.delete(tokenHash);
    },
  };

  readonly verificationTokenStore: VerificationTokenStore = {
    create: async (input) => {
      const record: VerificationTokenRecord = {
        id: randomUUID(),
        tokenHash: input.tokenHash,
        userId: input.userId,
        expiresAt: input.expiresAt,
        usedAt: null,
        createdAt: new Date(),
      };
      this.verificationTokens.set(record.id, record);
    },
    findByHash: async (tokenHash) =>
      [...this.verificationTokens.values()].find((token) => token.tokenHash === tokenHash) ?? null,
    markUsed: async (id) => {
      const record = this.verificationTokens.get(id);
      if (!record || record.usedAt !== null) {
        return false;
      }
      this.verificationTokens.set(id, { ...record, usedAt: new Date() });
      return true;
    },
  };

  readonly mailer = {
    send: async (message: EmailMessage): Promise<void> => {
      this.mail.push(message);
    },
  };

  addUser(overrides: Partial<UserRecord> = {}): UserRecord {
    const now = new Date();
    const user: UserRecord = {
      id: overrides.id ?? randomUUID(),
      email: overrides.email ?? `${randomUUID()}@test.local`,
      passwordHash: overrides.passwordHash ?? 'unset',
      firstName: overrides.firstName ?? 'Test',
      lastName: overrides.lastName ?? 'User',
      role: overrides.role ?? 'USER',
      status: overrides.status ?? 'ACTIVE',
      emailVerifiedAt: overrides.emailVerifiedAt ?? new Date(),
      createdAt: overrides.createdAt ?? now,
      updatedAt: overrides.updatedAt ?? now,
    };
    this.users.set(user.id, user);
    return user;
  }

  seedVerificationToken(
    rawToken: string,
    userId: string,
    expiresAt = new Date(Date.now() + 3_600_000),
  ): VerificationTokenRecord {
    const record: VerificationTokenRecord = {
      id: randomUUID(),
      tokenHash: hashToken(rawToken),
      userId,
      expiresAt,
      usedAt: null,
      createdAt: new Date(),
    };
    this.verificationTokens.set(record.id, record);
    return record;
  }

  deps(tokenService: TokenService = createFakeTokenService()): AuthDependencies {
    return {
      userRepository: this.userRepository,
      refreshTokenStore: this.refreshTokenStore,
      verificationTokenStore: this.verificationTokenStore,
      tokenService,
      mailer: this.mailer,
      logger: createTestLogger(),
      accessTokenTtlSeconds: 900,
      refreshTokenTtlSeconds: 2_592_000,
      verificationTokenTtlSeconds: 86_400,
      publicBaseUrl: 'http://localhost:3000',
    };
  }
}

export function createFakeBookingRepository(): BookingRepository {
  return {
    getJourneyContext: async () => null,
    findFare: async () => null,
    getHeldSeats: async () => [],
    extendHolds: async () => 0,
    findIdempotentResponse: async () => null,
    storeResponse: async () => undefined,
    createBooking: async () => ({ ok: false, conflict: 'reference' }),
    getBookingDetail: async () => null,
    listBookings: async () => [],
    cancelBooking: async () => 'NOT_FOUND',
  };
}

interface MemoryInventoryItem {
  journeyId: string;
  status: 'AVAILABLE' | 'HELD' | 'BOOKED';
  holdExpiresAt: Date | null;
  seatNumber: string;
  coachNumber: string;
  classCode: string;
  className: string;
}

interface MemoryPassenger {
  id: string;
  name: string;
  age: number;
  gender: string;
  documentType: string | null;
  documentReference: string | null;
}

interface MemorySeat {
  id: string;
  inventoryItemId: string;
  passengerId: string | null;
  allocationType: string;
  status: string;
}

interface MemoryBooking {
  id: string;
  bookingReference: string;
  pnr: string | null;
  userId: string;
  journeyId: string;
  fromStationId: string;
  toStationId: string;
  status: string;
  totalAmount: number;
  currency: string;
  createdAt: Date;
  expiresAt: Date | null;
  passengers: MemoryPassenger[];
  seats: MemorySeat[];
}

const CANCELLABLE = new Set([
  'INITIATED',
  'SEATS_HELD',
  'PAYMENT_PENDING',
  'PAYMENT_FAILED',
  'PAYMENT_SUCCESS',
  'CONFIRMED',
]);

export class MemoryBookingRepository implements BookingRepository {
  readonly journeys = new Map<string, JourneyContextRow>();
  readonly fares = new Map<string, FareRow>();
  readonly inventory = new Map<string, MemoryInventoryItem>();
  readonly bookings = new Map<string, MemoryBooking>();
  readonly idempotency = new Map<string, StoredIdempotentResponse>();

  private nextId = 1;

  private id(prefix: string): string {
    this.nextId += 1;
    return `${prefix}-${this.nextId}`;
  }

  seedJourney(journey: JourneyContextRow): void {
    this.journeys.set(journey.id, journey);
  }

  seedFare(fromCode: string, toCode: string, classCode: string, fare: FareRow): void {
    this.fares.set(`${fromCode}:${toCode}:${classCode}`, fare);
  }

  seedHold(input: {
    id?: string;
    journeyId: string;
    seatNumber: string;
    coachNumber?: string;
    classCode?: string;
    className?: string;
    holdExpiresAt?: Date | null;
    status?: MemoryInventoryItem['status'];
  }): string {
    const id = input.id ?? this.id('inv');
    this.inventory.set(id, {
      journeyId: input.journeyId,
      status: input.status ?? 'HELD',
      holdExpiresAt:
        input.holdExpiresAt !== undefined
          ? input.holdExpiresAt
          : new Date(Date.now() + 10 * 60_000),
      seatNumber: input.seatNumber,
      coachNumber: input.coachNumber ?? 'C1',
      classCode: input.classCode ?? 'STD',
      className: input.className ?? 'Standard',
    });
    return id;
  }

  getBooking(reference: string): MemoryBooking | undefined {
    return this.bookings.get(reference);
  }

  async getJourneyContext(journeyId: string): Promise<JourneyContextRow | null> {
    const journey = this.journeys.get(journeyId);
    if (!journey) {
      return null;
    }
    return { ...journey, train: { ...journey.train }, stops: journey.stops.map((s) => ({ ...s })) };
  }

  async findFare(
    fromStationCode: string,
    toStationCode: string,
    classCode: string,
  ): Promise<FareRow | null> {
    return this.fares.get(`${fromStationCode}:${toStationCode}:${classCode}`) ?? null;
  }

  async getHeldSeats(journeyId: string, inventoryIds: string[]): Promise<HeldSeatRow[]> {
    const rows: HeldSeatRow[] = [];
    for (const id of inventoryIds) {
      const item = this.inventory.get(id);
      if (item && item.journeyId === journeyId && item.status === 'HELD') {
        rows.push({
          id,
          holdExpiresAt: item.holdExpiresAt,
          seatNumber: item.seatNumber,
          coachNumber: item.coachNumber,
          classCode: item.classCode,
          className: item.className,
        });
      }
    }
    return rows;
  }

  async extendHolds(inventoryIds: string[], expiresAt: Date): Promise<number> {
    let count = 0;
    for (const id of inventoryIds) {
      const item = this.inventory.get(id);
      if (item && item.status === 'HELD') {
        item.holdExpiresAt = expiresAt;
        count += 1;
      }
    }
    return count;
  }

  async findIdempotentResponse(
    userId: string,
    key: string,
  ): Promise<StoredIdempotentResponse | null> {
    return this.idempotency.get(`${userId}:${key}`) ?? null;
  }

  async storeResponse(
    userId: string,
    key: string,
    responseStatus: number,
    responseBody: unknown,
  ): Promise<void> {
    this.idempotency.set(`${userId}:${key}`, { responseStatus, responseBody });
  }

  async createBooking(input: CreateBookingRecordInput): Promise<CreateBookingResult> {
    if (input.idempotencyKey) {
      const mapKey = `${input.userId}:${input.idempotencyKey}`;
      if (this.idempotency.has(mapKey)) {
        return { ok: false, conflict: 'idempotency' };
      }
    }
    for (const booking of this.bookings.values()) {
      if (booking.pnr !== null && booking.pnr === input.pnr) {
        return { ok: false, conflict: 'pnr' };
      }
      if (booking.bookingReference === input.bookingReference) {
        return { ok: false, conflict: 'reference' };
      }
    }

    const bookingId = this.id('bkg');
    const passengers: MemoryPassenger[] = input.passengers.map((passenger) => ({
      id: this.id('pas'),
      name: passenger.name,
      age: passenger.age,
      gender: passenger.gender,
      documentType: passenger.documentType ?? null,
      documentReference: passenger.documentReference ?? null,
    }));
    const seats: MemorySeat[] = input.holdIds.map((inventoryItemId, index) => ({
      id: this.id('bst'),
      inventoryItemId,
      passengerId: passengers[index]?.id ?? null,
      allocationType: 'CONFIRMED',
      status: 'HELD',
    }));

    const booking: MemoryBooking = {
      id: bookingId,
      bookingReference: input.bookingReference,
      pnr: input.pnr,
      userId: input.userId,
      journeyId: input.journeyId,
      fromStationId: '',
      toStationId: '',
      status: 'SEATS_HELD',
      totalAmount: input.totalAmount,
      currency: input.currency,
      createdAt: new Date(),
      expiresAt: input.expiresAt,
      passengers,
      seats,
    };
    this.bookings.set(booking.bookingReference, booking);
    return {
      ok: true,
      bookingId: booking.id,
      bookingReference: booking.bookingReference,
      pnr: booking.pnr,
    };
  }

  private toDetailRow(booking: MemoryBooking): BookingDetailRow {
    const journey = this.journeys.get(booking.journeyId);
    const stops = journey?.stops ?? [];
    return {
      reference: booking.bookingReference,
      pnr: booking.pnr,
      status: booking.status as BookingDetailRow['status'],
      totalAmount: booking.totalAmount,
      currency: booking.currency,
      createdAt: booking.createdAt,
      expiresAt: booking.expiresAt,
      journeyId: booking.journeyId,
      journeyDate: journey?.journeyDate ?? new Date(),
      trainNumber: journey?.train.number ?? '',
      trainName: journey?.train.name ?? '',
      fromCode: stops[0]?.stationCode ?? '',
      fromName: stops[0]?.stationName ?? '',
      toCode: stops[stops.length - 1]?.stationCode ?? '',
      toName: stops[stops.length - 1]?.stationName ?? '',
      passengers: booking.passengers.map((passenger) => ({ ...passenger })),
      seats: booking.seats.map((seat) => {
        const item = this.inventory.get(seat.inventoryItemId);
        return {
          id: seat.id,
          seatNumber: item?.seatNumber ?? '',
          coachNumber: item?.coachNumber ?? '',
          classCode: item?.classCode ?? '',
          className: item?.className ?? '',
          allocationType: seat.allocationType,
          status: seat.status,
          passengerId: seat.passengerId,
        };
      }),
    };
  }

  async getBookingDetail(reference: string, userId: string): Promise<BookingDetailRow | null> {
    const booking = this.bookings.get(reference);
    if (!booking || booking.userId !== userId) {
      return null;
    }
    return this.toDetailRow(booking);
  }

  async listBookings(userId: string): Promise<BookingDetailRow[]> {
    const rows = [...this.bookings.values()]
      .filter((booking) => booking.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return rows.map((booking) => this.toDetailRow(booking));
  }

  async cancelBooking(reference: string, userId: string): Promise<CancelOutcome> {
    const booking = this.bookings.get(reference);
    if (!booking || booking.userId !== userId) {
      return 'NOT_FOUND';
    }
    if (!CANCELLABLE.has(booking.status)) {
      return 'INVALID_STATE';
    }
    booking.status = 'CANCELLED';
    for (const seat of booking.seats) {
      if (seat.status !== 'CANCELLED') {
        seat.status = 'CANCELLED';
      }
      const item = this.inventory.get(seat.inventoryItemId);
      if (item && (item.status === 'HELD' || item.status === 'BOOKED')) {
        item.status = 'AVAILABLE';
        item.holdExpiresAt = null;
      }
    }
    return 'CANCELLED';
  }
}
