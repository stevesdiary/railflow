import { ValidationError } from '../../common/errors/app-error.js';
import type {
  PublicSearchJourney,
  PublicSearchResult,
  SearchCache,
  SearchJourneyRow,
  SearchRepository,
} from './search.types.js';

const CODE_LENGTH_LIMIT = 10;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export class SearchService {
  constructor(
    private readonly repository: SearchRepository,
    private readonly cache?: SearchCache,
    private readonly cacheTtlSeconds?: number,
  ) {}

  async searchJourneys(
    fromCode: string,
    toCode: string,
    date: string,
    classCode?: string,
  ): Promise<PublicSearchResult> {
    const from = this.normalizeCode(fromCode, 'origin');
    const to = this.normalizeCode(toCode, 'destination');

    if (from === to) {
      throw new ValidationError('Origin and destination must differ');
    }

    const parsedDate = this.parseDate(date);
    const klass = this.normalizeOptionalClass(classCode);

    const cacheKey = `${from}:${to}:${parsedDate.toISOString().slice(0, 10)}:${klass ?? 'ALL'}`;
    if (this.cache && this.cacheTtlSeconds) {
      try {
        const cached = await this.cache.get(cacheKey);
        if (cached) {
          return cached;
        }
      } catch (error) {
        console.error('Search cache read failed', error);
      }
    }

    const rows = await this.repository.searchJourneys(from, to, parsedDate);

    const journeys: PublicSearchJourney[] = [];
    for (const row of rows) {
      const journey = this.buildJourney(row, from, to, klass);
      if (journey) {
        journeys.push(journey);
      }
    }

    journeys.sort(
      (a, b) =>
        a.departureTime.localeCompare(b.departureTime) ||
        a.train.number.localeCompare(b.train.number),
    );

    const result: PublicSearchResult = {
      from: journeys[0]?.from ?? { code: from, name: '', city: '' },
      to: journeys[0]?.to ?? { code: to, name: '', city: '' },
      date,
      journeys,
    };

    if (this.cache && this.cacheTtlSeconds) {
      try {
        await this.cache.set(cacheKey, result, this.cacheTtlSeconds);
      } catch (error) {
        console.error('Search cache write failed', error);
      }
    }

    return result;
  }

  private buildJourney(
    row: SearchJourneyRow,
    fromCode: string,
    toCode: string,
    classCode?: string,
  ): PublicSearchJourney | null {
    const fromIndex = row.stops.findIndex((stop) => stop.station.code === fromCode);
    const toIndex = row.stops.findIndex((stop) => stop.station.code === toCode);

    if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
      return null;
    }

    const fromStop = row.stops[fromIndex];
    const toStop = row.stops[toIndex];
    if (!fromStop || !toStop) {
      return null;
    }

    const departureTime = fromStop.departureTime ?? fromStop.arrivalTime;
    const arrivalTime = toStop.arrivalTime ?? toStop.departureTime;
    if (!departureTime || !arrivalTime) {
      return null;
    }

    const durationMinutes = this.durationMinutes(
      departureTime,
      fromStop.dayOffset,
      arrivalTime,
      toStop.dayOffset,
    );

    const classes = (
      classCode ? row.classes.filter((item) => item.code === classCode) : row.classes
    )
      .map((coachClass) => {
        const fare = row.fares.find((item) => item.classCode === coachClass.code);
        if (!fare) {
          return null;
        }
        return {
          code: coachClass.code,
          name: coachClass.name,
          fare: fare.amount,
          currency: fare.currency,
          availableSeats: coachClass.availableSeats,
          capacity: coachClass.capacity,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => a.fare - b.fare);

    if (classes.length === 0) {
      return null;
    }

    let totalCapacity = 0;
    let totalAvailable = 0;
    for (const c of classes) {
      totalCapacity += c.capacity;
      totalAvailable += c.availableSeats;
    }

    let status: 'AVAILABLE' | 'LIMITED' | 'SOLD_OUT' = 'AVAILABLE';
    if (totalAvailable === 0) {
      status = 'SOLD_OUT';
    } else if (totalAvailable <= totalCapacity * 0.2) {
      status = 'LIMITED';
    }

    return {
      journeyId: row.journeyId,
      train: row.train,
      from: {
        code: fromStop.station.code,
        name: fromStop.station.name,
        city: fromStop.station.city,
      },
      to: { code: toStop.station.code, name: toStop.station.name, city: toStop.station.city },
      departureTime,
      arrivalTime,
      durationMinutes,
      stopCount: toIndex - fromIndex + 1,
      classes,
      availability: {
        availableSeats: totalAvailable,
        capacity: totalCapacity,
        status,
      },
    };
  }

  private durationMinutes(
    departureTime: string,
    departureOffset: number,
    arrivalTime: string,
    arrivalOffset: number,
  ): number {
    const departureMinutes = this.timeToMinutes(departureTime) + departureOffset * 1440;
    const arrivalMinutes = this.timeToMinutes(arrivalTime) + arrivalOffset * 1440;
    return Math.max(0, arrivalMinutes - departureMinutes);
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours ?? 0) * 60 + (minutes ?? 0);
  }

  private normalizeCode(code: string, label: string): string {
    const trimmed = code?.trim().toUpperCase() ?? '';
    if (!trimmed) {
      throw new ValidationError(`Missing required query parameter: ${label}`);
    }
    if (trimmed.length > CODE_LENGTH_LIMIT) {
      throw new ValidationError(`${label} code is too long`);
    }
    return trimmed;
  }

  private normalizeOptionalClass(classCode: string | undefined): string | undefined {
    if (!classCode || classCode.trim() === '') {
      return undefined;
    }
    const trimmed = classCode.trim().toUpperCase();
    if (trimmed.length > CODE_LENGTH_LIMIT) {
      throw new ValidationError('Class code is too long');
    }
    return trimmed;
  }

  private parseDate(date: string): Date {
    if (!DATE_PATTERN.test(date ?? '')) {
      throw new ValidationError('Invalid date format. Expected YYYY-MM-DD');
    }
    const parsed = new Date(`${date}T00:00:00.000Z`);
    if (Number.isNaN(parsed.getTime())) {
      throw new ValidationError('Invalid date');
    }
    return parsed;
  }
}
