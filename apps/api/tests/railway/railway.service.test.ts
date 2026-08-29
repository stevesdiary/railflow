import { describe, expect, it, vi } from 'vitest';
import { NotFoundError, ValidationError } from '../../src/common/errors/app-error.js';
import { RailwayService } from '../../src/modules/railway/railway.service.js';
import type {
  PublicFare,
  PublicStation,
  PublicTrain,
  RailwayRepository,
} from '../../src/modules/railway/railway.types.js';

function createFakeRepository(overrides: Partial<RailwayRepository> = {}): RailwayRepository {
  return {
    listStations: vi.fn(async () => []),
    getStationByCode: vi.fn(async () => null),
    listTrains: vi.fn(async () => []),
    getTrainByNumber: vi.fn(async () => null),
    listClasses: vi.fn(async () => []),
    listQuotas: vi.fn(async () => []),
    listFares: vi.fn(async () => []),
    ...overrides,
  };
}

const sampleStation: PublicStation = {
  id: 's1',
  code: 'LAG',
  name: 'Lagos (Iganmu)',
  city: 'Lagos',
  state: 'Lagos',
  latitude: null,
  longitude: null,
};

const sampleTrain: PublicTrain = {
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
};

describe('RailwayService', () => {
  it('lists stations without a query', async () => {
    const repo = createFakeRepository({ listStations: vi.fn(async () => [sampleStation]) });
    const service = new RailwayService(repo);

    const stations = await service.listStations();

    expect(stations).toHaveLength(1);
    expect(repo.listStations).toHaveBeenCalledWith(undefined);
  });

  it('trims the station query before delegating', async () => {
    const repo = createFakeRepository();
    const service = new RailwayService(repo);

    await service.listStations('  Ibadan  ');

    expect(repo.listStations).toHaveBeenCalledWith('Ibadan');
  });

  it('rejects over-long search queries', async () => {
    const repo = createFakeRepository();
    const service = new RailwayService(repo);

    await expect(service.listStations('x'.repeat(51))).rejects.toBeInstanceOf(ValidationError);
  });

  it('returns a station by code', async () => {
    const repo = createFakeRepository({
      getStationByCode: vi.fn(async () => sampleStation),
    });
    const service = new RailwayService(repo);

    const station = await service.getStationByCode('LAG');

    expect(station.code).toBe('LAG');
    expect(repo.getStationByCode).toHaveBeenCalledWith('LAG');
  });

  it('throws NotFoundError for an unknown station', async () => {
    const repo = createFakeRepository();
    const service = new RailwayService(repo);

    await expect(service.getStationByCode('XYZ')).rejects.toBeInstanceOf(NotFoundError);
  });

  it('lists trains', async () => {
    const repo = createFakeRepository({ listTrains: vi.fn(async () => []) });
    const service = new RailwayService(repo);

    await service.listTrains();

    expect(repo.listTrains).toHaveBeenCalled();
  });

  it('returns a train by number', async () => {
    const repo = createFakeRepository({
      getTrainByNumber: vi.fn(async () => sampleTrain),
    });
    const service = new RailwayService(repo);

    const train = await service.getTrainByNumber('NRC-101');

    expect(train.number).toBe('NRC-101');
    expect(train.stops).toHaveLength(2);
    expect(repo.getTrainByNumber).toHaveBeenCalledWith('NRC-101');
  });

  it('throws NotFoundError for an unknown train', async () => {
    const repo = createFakeRepository();
    const service = new RailwayService(repo);

    await expect(service.getTrainByNumber('NRC-999')).rejects.toBeInstanceOf(NotFoundError);
  });

  it('lists classes and quotas', async () => {
    const repo = createFakeRepository({
      listClasses: vi.fn(async () => [
        { id: 'cl1', code: 'STD', name: 'Standard', description: null },
      ]),
      listQuotas: vi.fn(async () => [
        { id: 'q1', code: 'GENERAL', name: 'General', description: null, priority: 0 },
      ]),
    });
    const service = new RailwayService(repo);

    await expect(service.listClasses()).resolves.toHaveLength(1);
    await expect(service.listQuotas()).resolves.toHaveLength(1);
  });

  it('normalizes fare filters to uppercase', async () => {
    const repo = createFakeRepository({ listFares: vi.fn(async () => []) });
    const service = new RailwayService(repo);

    await service.listFares('lag', 'ibadan', 'std');

    expect(repo.listFares).toHaveBeenCalledWith('LAG', 'IBADAN', 'STD');
  });

  it('rejects fares with the same origin and destination', async () => {
    const repo = createFakeRepository();
    const service = new RailwayService(repo);

    await expect(service.listFares('LAG', 'lag')).rejects.toBeInstanceOf(ValidationError);
  });

  it('returns fares without filters', async () => {
    const fare: PublicFare = {
      id: 'f1',
      from: { code: 'LAG', name: 'Lagos (Iganmu)', city: 'Lagos' },
      to: { code: 'IBADAN', name: 'Ibadan', city: 'Ibadan' },
      class: { code: 'STD', name: 'Standard' },
      amount: 3500,
      currency: 'NGN',
    };
    const repo = createFakeRepository({ listFares: vi.fn(async () => [fare]) });
    const service = new RailwayService(repo);

    const fares = await service.listFares();

    expect(fares[0]?.amount).toBe(3500);
  });
});
