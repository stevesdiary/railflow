import type { PrismaClient } from '../../generated/prisma/client.js';
import type {
  PublicClass,
  PublicCoach,
  PublicFare,
  PublicQuota,
  PublicStation,
  PublicTrain,
  PublicTrainSummary,
  RailwayRepository,
} from '../../modules/railway/railway.types.js';

export class PrismaRailwayRepository implements RailwayRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listStations(query?: string): Promise<PublicStation[]> {
    const where = query
      ? {
          OR: [
            { code: { contains: query, mode: 'insensitive' as const } },
            { name: { contains: query, mode: 'insensitive' as const } },
            { city: { contains: query, mode: 'insensitive' as const } },
          ],
        }
      : undefined;

    const stations = await this.prisma.station.findMany({
      where,
      orderBy: [{ code: 'asc' }],
      take: 100,
    });
    return stations.map(toPublicStation);
  }

  async getStationByCode(code: string): Promise<PublicStation | null> {
    const station = await this.prisma.station.findUnique({ where: { code } });
    return station ? toPublicStation(station) : null;
  }

  async listTrains(): Promise<PublicTrainSummary[]> {
    const trains = await this.prisma.train.findMany({
      where: { status: 'ACTIVE' },
      include: {
        stops: { orderBy: { sequence: 'asc' }, include: { station: true } },
      },
      orderBy: [{ number: 'asc' }],
    });

    return trains.map((train) => {
      const first = train.stops[0];
      const last = train.stops[train.stops.length - 1];
      return {
        id: train.id,
        number: train.number,
        name: train.name,
        type: train.type,
        status: train.status,
        stopCount: train.stops.length,
        origin: first ? { code: first.station.code, name: first.station.name } : null,
        destination: last ? { code: last.station.code, name: last.station.name } : null,
      };
    });
  }

  async getTrainByNumber(number: string): Promise<PublicTrain | null> {
    const train = await this.prisma.train.findUnique({
      where: { number },
      include: {
        stops: {
          orderBy: { sequence: 'asc' },
          include: { station: true },
        },
        coaches: {
          include: { class: true },
          orderBy: { coachNumber: 'asc' },
        },
      },
    });

    if (!train) {
      return null;
    }

    return {
      id: train.id,
      number: train.number,
      name: train.name,
      type: train.type,
      status: train.status,
      stops: train.stops.map((stop) => ({
        id: stop.id,
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
      coaches: train.coaches.map(toPublicCoach),
    };
  }

  async listClasses(): Promise<PublicClass[]> {
    const classes = await this.prisma.coachClass.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { code: 'asc' },
    });
    return classes.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      description: item.description,
    }));
  }

  async listQuotas(): Promise<PublicQuota[]> {
    const quotas = await this.prisma.quota.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { priority: 'asc' },
    });
    return quotas.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      description: item.description,
      priority: item.priority,
    }));
  }

  async listFares(fromCode?: string, toCode?: string, classCode?: string): Promise<PublicFare[]> {
    const fares = await this.prisma.fare.findMany({
      where: {
        status: 'ACTIVE',
        ...(fromCode ? { fromStation: { code: fromCode } } : {}),
        ...(toCode ? { toStation: { code: toCode } } : {}),
        ...(classCode ? { class: { code: classCode } } : {}),
      },
      include: {
        fromStation: true,
        toStation: true,
        class: true,
      },
      orderBy: [{ fromStation: { code: 'asc' } }, { toStation: { code: 'asc' } }],
      take: 200,
    });

    return fares.map((fare) => ({
      id: fare.id,
      from: {
        code: fare.fromStation.code,
        name: fare.fromStation.name,
        city: fare.fromStation.city,
      },
      to: {
        code: fare.toStation.code,
        name: fare.toStation.name,
        city: fare.toStation.city,
      },
      class: { code: fare.class.code, name: fare.class.name },
      amount: fare.amount,
      currency: fare.currency,
    }));
  }
}

function toPublicStation(station: {
  id: string;
  code: string;
  name: string;
  city: string;
  state: string | null;
  latitude: { toString(): string } | null;
  longitude: { toString(): string } | null;
}): PublicStation {
  return {
    id: station.id,
    code: station.code,
    name: station.name,
    city: station.city,
    state: station.state,
    latitude: station.latitude ? station.latitude.toString() : null,
    longitude: station.longitude ? station.longitude.toString() : null,
  };
}

function toPublicCoach(coach: {
  id: string;
  coachNumber: string;
  capacity: number;
  class: { code: string; name: string };
}): PublicCoach {
  return {
    id: coach.id,
    coachNumber: coach.coachNumber,
    capacity: coach.capacity,
    class: { code: coach.class.code, name: coach.class.name },
  };
}
