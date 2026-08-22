import { PrismaClient } from '../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

let prisma: PrismaClient | undefined;

export function getPrisma(): PrismaClient {
  if (!prisma) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is required to initialize PrismaClient');
    }

    const adapter = new PrismaPg({
      connectionString,
      max: 10,
      connectionTimeoutMillis: 5_000,
    });

    prisma = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    });
  }
  return prisma;
}

export async function closePrisma(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect();
    prisma = undefined;
  }
}

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await getPrisma().$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connectivity check failed', error);
    return false;
  }
}
