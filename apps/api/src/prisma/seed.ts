import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required to run the seed');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

interface StationSeed {
  code: string;
  name: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
}

const STATIONS: StationSeed[] = [
  {
    code: 'LAG',
    name: 'Lagos (Iganmu)',
    city: 'Lagos',
    state: 'Lagos',
    latitude: '6.4698000',
    longitude: '3.3628000',
  },
  {
    code: 'IBADAN',
    name: 'Ibadan',
    city: 'Ibadan',
    state: 'Oyo',
    latitude: '7.3775000',
    longitude: '3.9470000',
  },
  {
    code: 'ILORIN',
    name: 'Ilorin',
    city: 'Ilorin',
    state: 'Kwara',
    latitude: '8.4799000',
    longitude: '4.5418000',
  },
  {
    code: 'MINNA',
    name: 'Minna',
    city: 'Minna',
    state: 'Niger',
    latitude: '9.6140000',
    longitude: '6.5468000',
  },
  {
    code: 'ABJ',
    name: 'Abuja (Idu)',
    city: 'Abuja',
    state: 'FCT',
    latitude: '9.0579000',
    longitude: '7.4951000',
  },
  {
    code: 'KADUNA',
    name: 'Kaduna',
    city: 'Kaduna',
    state: 'Kaduna',
    latitude: '10.5105000',
    longitude: '7.4384000',
  },
];

const CLASSES = [
  { code: 'STD', name: 'Standard', description: 'Standard air-conditioned coach' },
  { code: 'EC', name: 'Executive', description: 'Premium executive coach' },
  { code: 'SLEEPER', name: 'Sleeper', description: 'Sleeper berth coach' },
];

const QUOTAS = [
  { code: 'GENERAL', name: 'General', description: 'General quota', priority: 0 },
  { code: 'LADIES', name: 'Ladies', description: 'Reserved for women', priority: 10 },
  {
    code: 'SENIOR',
    name: 'Senior Citizen',
    description: 'Concession for senior citizens',
    priority: 20,
  },
  { code: 'TATKAL', name: 'Tatkal', description: 'Last-minute booking quota', priority: 30 },
];

interface CoachSeed {
  coachNumber: string;
  classCode: string;
  capacity: number;
}

interface TrainSeed {
  number: string;
  name: string;
  type: 'INTERCITY' | 'EXPRESS' | 'RAPID' | 'SUBURBAN';
  stops: Array<{
    stationCode: string;
    sequence: number;
    arrivalTime: string | null;
    departureTime: string | null;
    dayOffset: number;
  }>;
  coaches: CoachSeed[];
}

const TRAINS: TrainSeed[] = [
  {
    number: 'NRC-101',
    name: 'Lagos-Abuja Express',
    type: 'INTERCITY',
    stops: [
      { stationCode: 'LAG', sequence: 1, arrivalTime: null, departureTime: '08:00', dayOffset: 0 },
      {
        stationCode: 'IBADAN',
        sequence: 2,
        arrivalTime: '10:30',
        departureTime: '10:45',
        dayOffset: 0,
      },
      {
        stationCode: 'ILORIN',
        sequence: 3,
        arrivalTime: '14:00',
        departureTime: '14:15',
        dayOffset: 0,
      },
      {
        stationCode: 'MINNA',
        sequence: 4,
        arrivalTime: '17:30',
        departureTime: '17:45',
        dayOffset: 0,
      },
      { stationCode: 'ABJ', sequence: 5, arrivalTime: '19:30', departureTime: null, dayOffset: 0 },
    ],
    coaches: [
      { coachNumber: 'C1', classCode: 'STD', capacity: 64 },
      { coachNumber: 'C2', classCode: 'STD', capacity: 64 },
      { coachNumber: 'C3', classCode: 'EC', capacity: 32 },
      { coachNumber: 'C4', classCode: 'SLEEPER', capacity: 24 },
    ],
  },
  {
    number: 'NRC-202',
    name: 'Abuja-Kaduna Daylight',
    type: 'RAPID',
    stops: [
      { stationCode: 'ABJ', sequence: 1, arrivalTime: null, departureTime: '07:00', dayOffset: 0 },
      {
        stationCode: 'KADUNA',
        sequence: 2,
        arrivalTime: '09:45',
        departureTime: null,
        dayOffset: 0,
      },
    ],
    coaches: [
      { coachNumber: 'C1', classCode: 'STD', capacity: 64 },
      { coachNumber: 'C2', classCode: 'EC', capacity: 32 },
    ],
  },
];

const FARE_MATRIX: Array<{ from: string; to: string; classCode: string; amount: number }> = [
  { from: 'LAG', to: 'IBADAN', classCode: 'STD', amount: 3500 },
  { from: 'LAG', to: 'IBADAN', classCode: 'EC', amount: 6500 },
  { from: 'LAG', to: 'IBADAN', classCode: 'SLEEPER', amount: 5800 },
  { from: 'LAG', to: 'ILORIN', classCode: 'STD', amount: 7500 },
  { from: 'LAG', to: 'ILORIN', classCode: 'EC', amount: 14000 },
  { from: 'LAG', to: 'ILORIN', classCode: 'SLEEPER', amount: 12500 },
  { from: 'LAG', to: 'MINNA', classCode: 'STD', amount: 12000 },
  { from: 'LAG', to: 'MINNA', classCode: 'EC', amount: 21000 },
  { from: 'LAG', to: 'MINNA', classCode: 'SLEEPER', amount: 18500 },
  { from: 'LAG', to: 'ABJ', classCode: 'STD', amount: 18000 },
  { from: 'LAG', to: 'ABJ', classCode: 'EC', amount: 32000 },
  { from: 'LAG', to: 'ABJ', classCode: 'SLEEPER', amount: 28000 },
  { from: 'IBADAN', to: 'ILORIN', classCode: 'STD', amount: 4500 },
  { from: 'IBADAN', to: 'ILORIN', classCode: 'EC', amount: 8000 },
  { from: 'IBADAN', to: 'ILORIN', classCode: 'SLEEPER', amount: 7200 },
  { from: 'IBADAN', to: 'MINNA', classCode: 'STD', amount: 9000 },
  { from: 'IBADAN', to: 'MINNA', classCode: 'EC', amount: 16000 },
  { from: 'IBADAN', to: 'MINNA', classCode: 'SLEEPER', amount: 14000 },
  { from: 'IBADAN', to: 'ABJ', classCode: 'STD', amount: 15000 },
  { from: 'IBADAN', to: 'ABJ', classCode: 'EC', amount: 26000 },
  { from: 'IBADAN', to: 'ABJ', classCode: 'SLEEPER', amount: 23000 },
  { from: 'ILORIN', to: 'MINNA', classCode: 'STD', amount: 5000 },
  { from: 'ILORIN', to: 'MINNA', classCode: 'EC', amount: 9000 },
  { from: 'ILORIN', to: 'MINNA', classCode: 'SLEEPER', amount: 8000 },
  { from: 'ILORIN', to: 'ABJ', classCode: 'STD', amount: 11000 },
  { from: 'ILORIN', to: 'ABJ', classCode: 'EC', amount: 19000 },
  { from: 'ILORIN', to: 'ABJ', classCode: 'SLEEPER', amount: 16500 },
  { from: 'MINNA', to: 'ABJ', classCode: 'STD', amount: 6000 },
  { from: 'MINNA', to: 'ABJ', classCode: 'EC', amount: 10500 },
  { from: 'MINNA', to: 'ABJ', classCode: 'SLEEPER', amount: 9000 },
  { from: 'ABJ', to: 'KADUNA', classCode: 'STD', amount: 8000 },
  { from: 'ABJ', to: 'KADUNA', classCode: 'EC', amount: 14500 },
];

const JOURNEY_DAYS_AHEAD = 14;

function seatsForCoach(coachNumber: string, classCode: string, capacity: number) {
  if (classCode === 'SLEEPER') {
    const berths = [];
    for (let n = 1; n <= 12; n++) {
      berths.push({ seatNumber: `L${n}`, seatType: 'LOWER_BERTH' });
      berths.push({ seatNumber: `U${n}`, seatType: 'UPPER_BERTH' });
    }
    return berths;
  }
  const rows = Math.ceil(capacity / 4);
  const seats = [];
  for (let row = 1; row <= rows; row++) {
    for (const [letter, seatType] of [
      ['A', 'WINDOW'],
      ['B', 'MIDDLE'],
      ['C', 'MIDDLE'],
      ['D', 'AISLE'],
    ] as const) {
      if (seats.length >= capacity) break;
      seats.push({ seatNumber: `${row}${letter}`, seatType });
    }
  }
  return seats;
}

async function main() {
  console.log('Seeding stations...');
  const stationIds = new Map<string, string>();
  for (const station of STATIONS) {
    const saved = await prisma.station.upsert({
      where: { code: station.code },
      update: {
        name: station.name,
        city: station.city,
        state: station.state,
        latitude: station.latitude,
        longitude: station.longitude,
      },
      create: station,
    });
    stationIds.set(station.code, saved.id);
  }

  console.log('Seeding classes...');
  const classIds = new Map<string, string>();
  for (const item of CLASSES) {
    const saved = await prisma.coachClass.upsert({
      where: { code: item.code },
      update: { name: item.name, description: item.description },
      create: item,
    });
    classIds.set(item.code, saved.id);
  }

  console.log('Seeding quotas...');
  for (const quota of QUOTAS) {
    await prisma.quota.upsert({
      where: { code: quota.code },
      update: { name: quota.name, description: quota.description, priority: quota.priority },
      create: quota,
    });
  }

  console.log('Seeding trains, coaches and seats...');
  const trainIds = new Map<string, string>();
  for (const train of TRAINS) {
    const saved = await prisma.train.upsert({
      where: { number: train.number },
      update: { name: train.name, type: train.type },
      create: { number: train.number, name: train.name, type: train.type },
    });
    trainIds.set(train.number, saved.id);

    await prisma.trainStop.deleteMany({ where: { trainId: saved.id } });
    await prisma.coach.deleteMany({ where: { trainId: saved.id } });

    for (const stop of train.stops) {
      await prisma.trainStop.create({
        data: {
          trainId: saved.id,
          stationId: stationIds.get(stop.stationCode)!,
          sequence: stop.sequence,
          arrivalTime: stop.arrivalTime,
          departureTime: stop.departureTime,
          dayOffset: stop.dayOffset,
        },
      });
    }

    for (const coach of train.coaches) {
      const savedCoach = await prisma.coach.create({
        data: {
          trainId: saved.id,
          coachNumber: coach.coachNumber,
          classId: classIds.get(coach.classCode)!,
          capacity: coach.capacity,
        },
      });
      const seats = seatsForCoach(coach.coachNumber, coach.classCode, coach.capacity);
      for (const [index, seat] of seats.entries()) {
        await prisma.seat.create({
          data: {
            coachId: savedCoach.id,
            seatNumber: seat.seatNumber,
            seatType: seat.seatType as never,
            position: index + 1,
          },
        });
      }
    }
  }

  console.log('Seeding fares...');
  for (const fare of FARE_MATRIX) {
    const fromStationId = stationIds.get(fare.from)!;
    const toStationId = stationIds.get(fare.to)!;
    const classId = classIds.get(fare.classCode)!;
    await prisma.fare.upsert({
      where: { fromStationId_toStationId_classId: { fromStationId, toStationId, classId } },
      update: { amount: fare.amount },
      create: { fromStationId, toStationId, classId, amount: fare.amount },
    });
  }

  console.log('Seeding journeys...');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (const train of TRAINS) {
    const trainId = trainIds.get(train.number)!;
    for (let offset = 0; offset < JOURNEY_DAYS_AHEAD; offset++) {
      const journeyDate = new Date(today);
      journeyDate.setDate(today.getDate() + offset);
      await prisma.journey.upsert({
        where: { trainId_journeyDate: { trainId, journeyDate } },
        update: {},
        create: { trainId, journeyDate },
      });
    }
  }

  console.log('Seeding inventory (per journey x seat)...');
  const journeys = await prisma.journey.findMany({ select: { id: true, trainId: true } });
  for (const journey of journeys) {
    const seatRows = await prisma.seat.findMany({
      where: { coach: { trainId: journey.trainId } },
      select: { id: true },
    });
    await prisma.inventoryItem.createMany({
      data: seatRows.map((seat) => ({ journeyId: journey.id, seatId: seat.id })),
      skipDuplicates: true,
    });
  }

  const counts = {
    stations: await prisma.station.count(),
    trains: await prisma.train.count(),
    stops: await prisma.trainStop.count(),
    coaches: await prisma.coach.count(),
    seats: await prisma.seat.count(),
    fares: await prisma.fare.count(),
    quotas: await prisma.quota.count(),
    journeys: await prisma.journey.count(),
    inventoryItems: await prisma.inventoryItem.count(),
  };
  console.log('Seed complete:', counts);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
