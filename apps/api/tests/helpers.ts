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
