import { z } from 'zod';

const logLevels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] as const;
const nodeEnvs = ['development', 'test', 'staging', 'production'] as const;

export const envSchema = z.object({
  NODE_ENV: z.enum(nodeEnvs).default('development'),

  API_HOST: z.string().min(1).default('0.0.0.0'),
  API_PORT: z.coerce.number().int().positive().max(65535).default(3000),
  API_REQUEST_TIMEOUT_MS: z.coerce.number().int().positive().default(30_000),
  CORS_ORIGIN: z.string().default('*'),

  LOG_LEVEL: z.enum(logLevels).default('info'),
  LOG_REDACT_PATHS: z
    .string()
    .default(
      'password,passwordConfirm,accessToken,refreshToken,authorization,cookie,cardNumber,cvv,secret,apiKey',
    )
    .transform((value) =>
      value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    ),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().min(1).default('redis://localhost:6379'),
  SEARCH_CACHE_TTL: z
    .string()
    .regex(/^\d+[smhd]$/, 'SEARCH_CACHE_TTL must look like 5m, 30m')
    .default('5m'),
  SEAT_HOLD_TTL: z
    .string()
    .regex(/^\d+[smhd]$/, 'SEAT_HOLD_TTL must look like 10m, 30m')
    .default('10m'),

  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 chars'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 chars'),
  JWT_ACCESS_TTL: z
    .string()
    .regex(/^\d+[smhd]$/, 'JWT_ACCESS_TTL must look like 15m, 30d')
    .default('15m'),
  JWT_REFRESH_TTL: z
    .string()
    .regex(/^\d+[smhd]$/, 'JWT_REFRESH_TTL must look like 15m, 30d')
    .default('30d'),

  EMAIL_VERIFICATION_TOKEN_TTL: z
    .string()
    .regex(/^\d+[smhd]$/, 'EMAIL_VERIFICATION_TOKEN_TTL must look like 24h')
    .default('24h'),

  PUBLIC_BASE_URL: z.string().url().default('http://localhost:3000'),
});

export type Env = z.infer<typeof envSchema>;

export type NodeEnv = Env['NODE_ENV'];
export type LogLevel = Env['LOG_LEVEL'];

const DURATION_UNITS: Record<string, number> = { s: 1, m: 60, h: 3_600, d: 86_400 };

export function parseDuration(value: string): number {
  const match = /^(\d+)([smhd])$/.exec(value);
  if (!match) {
    throw new Error(`Invalid duration: ${value}`);
  }
  const amount = match[1];
  const unit = match[2];
  if (amount === undefined || unit === undefined) {
    throw new Error(`Invalid duration: ${value}`);
  }
  const multiplier = DURATION_UNITS[unit];
  if (multiplier === undefined) {
    throw new Error(`Invalid duration: ${value}`);
  }
  return Number(amount) * multiplier;
}

export class ConfigError extends Error {
  readonly issues: z.ZodIssue[];

  constructor(issues: z.ZodIssue[]) {
    super(
      `Invalid environment configuration:\n${issues.map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`).join('\n')}`,
    );
    this.name = 'ConfigError';
    this.issues = issues;
  }
}

export interface LoadConfigOptions {
  env?: NodeJS.ProcessEnv;
  onError?: 'throw' | 'log';
}

export function loadConfig(options: LoadConfigOptions = {}): Env {
  const source = options.env ?? process.env;
  const result = envSchema.safeParse(source);

  if (!result.success) {
    throw new ConfigError(result.error.issues);
  }

  return result.data;
}
