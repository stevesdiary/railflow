import type { LogLevel, pino } from '@railflow/logger';
import { createLogger } from '@railflow/logger';
import type { Env } from '@railflow/config';
import { loadConfig } from '@railflow/config';

export const TEST_LOG_LEVEL: LogLevel = 'silent';

export function createTestConfig(overrides: Partial<Env> = {}): Env {
  return loadConfig({
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://railflow:railflow@localhost:5432/railflow_test',
      REDIS_URL: 'redis://localhost:6379/1',
      JWT_ACCESS_SECRET: 'test-access-secret-0123456789abcdef',
      JWT_REFRESH_SECRET: 'test-refresh-secret-0123456789abcdef',
      PUBLIC_BASE_URL: 'http://localhost:3000',
      LOG_LEVEL: TEST_LOG_LEVEL,
      ...Object.fromEntries(Object.entries(overrides).map(([key, value]) => [key, String(value)])),
    },
  });
}

export function createTestLogger(name = 'test'): pino.Logger {
  return createLogger({ name, level: TEST_LOG_LEVEL });
}
