import { Redis } from 'ioredis';

let redis: Redis | undefined;

export function getRedis(): Redis {
  if (!redis) {
    const connectionString = process.env.REDIS_URL;
    if (!connectionString) {
      throw new Error('REDIS_URL is required to initialize Redis');
    }

    redis = new Redis(connectionString, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
      lazyConnect: false,
    });

    redis.on('error', (error) => {
      console.error('Redis client error', error);
    });
  }
  return redis;
}

export async function closeRedis(): Promise<void> {
  if (redis) {
    const instance = redis;
    redis = undefined;
    await instance.quit().catch(() => {
      instance.disconnect();
    });
  }
}
