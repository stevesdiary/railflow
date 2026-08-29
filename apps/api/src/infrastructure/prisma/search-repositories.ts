import type { PrismaClient } from '../../generated/prisma/client.js';
import type { SearchJourneyRow, SearchRepository } from '../../modules/search/search.types.js';

const DAY_MS = 86_400_000;

export class PrismaSearchRepository implements SearchRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async searchJourneys(fromCode: string, toCode: string, date: Date): Promise<SearchJourneyRow[]> {
    const fromStation = await this.prisma.station.findUnique({
      where: { code: fromCode },
      select: { id: true },
    });
    const toStation = await this.prisma.station.findUnique({
      where: { code: toCode },
      select: { id: true },
    });
    if (!fromStation || !toStation) {
      return [];
    }

    const dayStart = new Date(`${date.toISOString().slice(0, 10)}T00:00:00.000Z`);
    const dayEnd = new Date(dayStart.getTime() + DAY_MS);

    const journeys = await this.prisma.journey.findMany({
      where: {
        journeyDate: { gte: dayStart, lt: dayEnd },
        status: 'SCHEDULED',
        train: {
          status: 'ACTIVE',
          stops: { some: { stationId: fromStation.id } },
        },
      },
      include: {
        train: {
          include: {
            stops: {
              orderBy: { sequence: 'asc' },
              include: { station: true },
            },
            coaches: {
              where: { status: 'ACTIVE' },
              orderBy: { coachNumber: 'asc' },
              include: {
                class: true,
                seats: { select: { status: true } },
              },
            },
          },
        },
      },
      orderBy: { journeyDate: 'asc' },
    });

    const matching = journeys.filter((journey) =>
      journey.train.stops.some((stop) => stop.stationId === toStation.id),
    );
    if (matching.length === 0) {
      return [];
    }

    const fares = await this.prisma.fare.findMany({
      where: {
        fromStationId: fromStation.id,
        toStationId: toStation.id,
        status: 'ACTIVE',
      },
      include: { class: { select: { code: true } } },
    });

    return matching.map((journey) => toSearchJourneyRow(journey, fares));
  }
}

function toSearchJourneyRow(
  journey: {
    id: string;
    journeyDate: Date;
    train: {
      id: string;
      number: string;
      name: string;
      type: string;
      stops: Array<{
        sequence: number;
        arrivalTime: string | null;
        departureTime: string | null;
        dayOffset: number;
        station: { code: string; name: string; city: string };
      }>;
      coaches: Array<{
        capacity: number;
        class: { code: string; name: string };
        seats: Array<{ status: string }>;
      }>;
    };
  },
  fares: Array<{ class: { code: string }; amount: number; currency: string }>,
): SearchJourneyRow {
  const classMap = new Map<
    string,
    { code: string; name: string; capacity: number; availableSeats: number }
  >();
  for (const coach of journey.train.coaches) {
    const entry = classMap.get(coach.class.code) ?? {
      code: coach.class.code,
      name: coach.class.name,
      capacity: 0,
      availableSeats: 0,
    };
    entry.capacity += coach.capacity;
    entry.availableSeats += coach.seats.filter((seat) => seat.status === 'AVAILABLE').length;
    classMap.set(coach.class.code, entry);
  }

  return {
    journeyId: journey.id,
    journeyDate: journey.journeyDate,
    train: {
      id: journey.train.id,
      number: journey.train.number,
      name: journey.train.name,
      type: journey.train.type,
    },
    stops: journey.train.stops.map((stop) => ({
      sequence: stop.sequence,
      arrivalTime: stop.arrivalTime,
      departureTime: stop.departureTime,
      dayOffset: stop.dayOffset,
      station: {
        code: stop.station.code,
        name: stop.station.name,
        city: stop.station.city,
      },
    })),
    classes: [...classMap.values()],
    fares: fares.map((fare) => ({
      classCode: fare.class.code,
      amount: fare.amount,
      currency: fare.currency,
    })),
  };
}
