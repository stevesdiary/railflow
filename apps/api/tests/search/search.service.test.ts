import { describe, expect, it } from 'vitest';
import { ValidationError } from '../../src/common/errors/app-error.js';
import { SearchService } from '../../src/modules/search/search.service.js';
import type {
  PublicSearchResult,
  SearchCache,
  SearchJourneyRow,
  SearchRepository,
} from '../../src/modules/search/search.types.js';

function row(overrides: Partial<SearchJourneyRow> = {}): SearchJourneyRow {
  return {
    journeyId: 'j1',
    journeyDate: new Date('2026-08-10T00:00:00.000Z'),
    train: { id: 't1', number: 'NRC-101', name: 'Lagos-Abuja Express', type: 'INTERCITY' },
    stops: [
      {
        sequence: 1,
        arrivalTime: null,
        departureTime: '08:00',
        dayOffset: 0,
        station: { code: 'LAG', name: 'Lagos (Iganmu)', city: 'Lagos' },
      },
      {
        sequence: 2,
        arrivalTime: '19:30',
        departureTime: null,
        dayOffset: 0,
        station: { code: 'ABJ', name: 'Abuja (Idu)', city: 'Abuja' },
      },
    ],
    classes: [{ code: 'STD', name: 'Standard', capacity: 128, availableSeats: 128 }],
    fares: [{ classCode: 'STD', amount: 18000, currency: 'NGN' }],
    ...overrides,
  };
}

function repoWith(rows: SearchJourneyRow[]): SearchRepository {
  return { searchJourneys: async () => rows };
}

describe('SearchService', () => {
  it('returns journeys for the requested corridor', async () => {
    const service = new SearchService(repoWith([row()]));
    const result = await service.searchJourneys('LAG', 'ABJ', '2026-08-10');
    expect(result.journeys).toHaveLength(1);
    expect(result.journeys[0]).toMatchObject({ departureTime: '08:00', arrivalTime: '19:30' });
  });

  it('normalizes codes to uppercase', async () => {
    let calledWith: { from: string; to: string } | undefined;
    const repo: SearchRepository = {
      searchJourneys: async (from, to) => {
        calledWith = { from, to };
        return [row()];
      },
    };
    const service = new SearchService(repo);
    await service.searchJourneys('lag', 'abj', '2026-08-10');
    expect(calledWith).toEqual({ from: 'LAG', to: 'ABJ' });
  });

  it('skips journeys where destination precedes origin on the route', async () => {
    const service = new SearchService(repoWith([row()]));
    const result = await service.searchJourneys('ABJ', 'LAG', '2026-08-10');
    expect(result.journeys).toHaveLength(0);
  });

  it('computes duration across a day boundary', async () => {
    const overnight = row({
      stops: [
        {
          sequence: 1,
          arrivalTime: null,
          departureTime: '23:00',
          dayOffset: 0,
          station: { code: 'LAG', name: 'Lagos (Iganmu)', city: 'Lagos' },
        },
        {
          sequence: 2,
          arrivalTime: '07:00',
          departureTime: null,
          dayOffset: 1,
          station: { code: 'ABJ', name: 'Abuja (Idu)', city: 'Abuja' },
        },
      ],
    });
    const service = new SearchService(repoWith([overnight]));
    const result = await service.searchJourneys('LAG', 'ABJ', '2026-08-10');
    expect(result.journeys[0]?.durationMinutes).toBe(480);
  });

  it('omits classes without a fare for the corridor', async () => {
    const multi = row({
      classes: [
        { code: 'STD', name: 'Standard', capacity: 128, availableSeats: 100 },
        { code: 'EC', name: 'Executive', capacity: 32, availableSeats: 32 },
      ],
      fares: [{ classCode: 'STD', amount: 18000, currency: 'NGN' }],
    });
    const service = new SearchService(repoWith([multi]));
    const result = await service.searchJourneys('LAG', 'ABJ', '2026-08-10');
    expect(result.journeys[0]?.classes).toHaveLength(1);
    expect(result.journeys[0]?.classes[0]?.code).toBe('STD');
  });

  it('sorts classes by fare ascending', async () => {
    const multi = row({
      classes: [
        { code: 'EC', name: 'Executive', capacity: 32, availableSeats: 32 },
        { code: 'STD', name: 'Standard', capacity: 128, availableSeats: 128 },
      ],
      fares: [
        { classCode: 'STD', amount: 18000, currency: 'NGN' },
        { classCode: 'EC', amount: 32000, currency: 'NGN' },
      ],
    });
    const service = new SearchService(repoWith([multi]));
    const result = await service.searchJourneys('LAG', 'ABJ', '2026-08-10');
    expect(result.journeys[0]?.classes.map((c) => c.code)).toEqual(['STD', 'EC']);
  });

  it('rejects missing origin', async () => {
    const service = new SearchService(repoWith([]));
    await expect(service.searchJourneys('', 'ABJ', '2026-08-10')).rejects.toBeInstanceOf(
      ValidationError,
    );
  });

  it('rejects malformed date', async () => {
    const service = new SearchService(repoWith([]));
    await expect(service.searchJourneys('LAG', 'ABJ', 'not-a-date')).rejects.toBeInstanceOf(
      ValidationError,
    );
  });

  it('filters classes to the requested class', async () => {
    const multi = row({
      classes: [
        { code: 'STD', name: 'Standard', capacity: 128, availableSeats: 100 },
        { code: 'EC', name: 'Executive', capacity: 32, availableSeats: 32 },
      ],
      fares: [
        { classCode: 'STD', amount: 18000, currency: 'NGN' },
        { classCode: 'EC', amount: 32000, currency: 'NGN' },
      ],
    });
    const service = new SearchService(repoWith([multi]));
    const result = await service.searchJourneys('LAG', 'ABJ', '2026-08-10', 'ec');
    expect(result.journeys[0]?.classes.map((c) => c.code)).toEqual(['EC']);
  });

  it('drops journeys that do not offer the requested class', async () => {
    const onlyStd = row({
      classes: [{ code: 'STD', name: 'Standard', capacity: 128, availableSeats: 128 }],
      fares: [{ classCode: 'STD', amount: 18000, currency: 'NGN' }],
    });
    const service = new SearchService(repoWith([onlyStd]));
    const result = await service.searchJourneys('LAG', 'ABJ', '2026-08-10', 'EC');
    expect(result.journeys).toHaveLength(0);
  });

  it('rejects an over-long class code', async () => {
    const service = new SearchService(repoWith([]));
    await expect(
      service.searchJourneys('LAG', 'ABJ', '2026-08-10', 'SUPERCALIFRAGILISTIC'),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('returns a cached result without querying the repository', async () => {
    const cached: PublicSearchResult = {
      from: { code: 'LAG', name: 'Lagos (Iganmu)', city: 'Lagos' },
      to: { code: 'ABJ', name: 'Abuja (Idu)', city: 'Abuja' },
      date: '2026-08-10',
      journeys: [],
    };
    const cache: SearchCache = { get: async () => cached, set: async () => {} };
    let repoCalled = false;
    const countingRepo: SearchRepository = {
      searchJourneys: async () => {
        repoCalled = true;
        return [];
      },
    };
    const service = new SearchService(countingRepo, cache, 300);
    const result = await service.searchJourneys('LAG', 'ABJ', '2026-08-10');
    expect(result).toBe(cached);
    expect(repoCalled).toBe(false);
  });

  it('stores a miss result in the cache', async () => {
    const stored: PublicSearchResult[] = [];
    const cache: SearchCache = {
      get: async () => null,
      set: async (_key, value) => {
        stored.push(value);
      },
    };
    const service = new SearchService(repoWith([row()]), cache, 300);
    const result = await service.searchJourneys('LAG', 'ABJ', '2026-08-10');
    expect(result.journeys).toHaveLength(1);
    expect(stored).toHaveLength(1);
    expect(stored[0]?.journeys[0]?.journeyId).toBe('j1');
  });

  it('falls back to the repository when the cache read fails', async () => {
    const failingCache: SearchCache = {
      get: async () => {
        throw new Error('redis down');
      },
      set: async () => {},
    };
    const service = new SearchService(repoWith([row()]), failingCache, 300);
    const result = await service.searchJourneys('LAG', 'ABJ', '2026-08-10');
    expect(result.journeys).toHaveLength(1);
  });

  it('falls back to the repository when the cache write fails', async () => {
    const failingCache: SearchCache = {
      get: async () => null,
      set: async () => {
        throw new Error('redis down');
      },
    };
    const service = new SearchService(repoWith([row()]), failingCache, 300);
    const result = await service.searchJourneys('LAG', 'ABJ', '2026-08-10');
    expect(result.journeys).toHaveLength(1);
  });

  it('does not use the cache when no TTL is provided', async () => {
    let cacheCalls = 0;
    const cache: SearchCache = {
      get: async () => {
        cacheCalls += 1;
        return null;
      },
      set: async () => {
        cacheCalls += 1;
      },
    };
    const service = new SearchService(repoWith([row()]), cache);
    const result = await service.searchJourneys('LAG', 'ABJ', '2026-08-10');
    expect(result.journeys).toHaveLength(1);
    expect(cacheCalls).toBe(0);
  });
});
