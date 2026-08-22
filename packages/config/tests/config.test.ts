import { describe, expect, it } from 'vitest';
import { ConfigError, envSchema, loadConfig, parseDuration } from '../src/index.js';

const baseEnv = {
  DATABASE_URL: 'postgresql://railflow:railflow@localhost:5432/railflow',
  REDIS_URL: 'redis://localhost:6379/0',
  JWT_ACCESS_SECRET: 'test-access-secret-0123456789abcdef',
  JWT_REFRESH_SECRET: 'test-refresh-secret-0123456789abcdef',
};

describe('loadConfig', () => {
  it('loads valid config with defaults', () => {
    const config = loadConfig({ env: baseEnv });

    expect(config.NODE_ENV).toBe('development');
    expect(config.API_HOST).toBe('0.0.0.0');
    expect(config.API_PORT).toBe(3000);
    expect(config.LOG_LEVEL).toBe('info');
    expect(config.REDIS_URL).toBe('redis://localhost:6379/0');
    expect(config.LOG_REDACT_PATHS).toContain('password');
  });

  it('coerces numeric values', () => {
    const config = loadConfig({ env: { ...baseEnv, API_PORT: '8080' } });
    expect(config.API_PORT).toBe(8080);
  });

  it('parses comma-separated redaction paths', () => {
    const config = loadConfig({ env: { ...baseEnv, LOG_REDACT_PATHS: 'password, token' } });
    expect(config.LOG_REDACT_PATHS).toEqual(['password', 'token']);
  });

  it('throws ConfigError when DATABASE_URL is missing', () => {
    expect(() => loadConfig({ env: {} })).toThrow(ConfigError);
  });

  it('throws ConfigError on invalid enum values', () => {
    expect(() => loadConfig({ env: { ...baseEnv, NODE_ENV: 'staging2' } })).toThrow(ConfigError);
  });

  it('throws ConfigError on invalid port', () => {
    expect(() => loadConfig({ env: { ...baseEnv, API_PORT: '99999' } })).toThrow(ConfigError);
  });

  it('exposes the raw zod issues on ConfigError', () => {
    try {
      loadConfig({ env: {} });
      throw new Error('expected to throw');
    } catch (error) {
      expect(error).toBeInstanceOf(ConfigError);
      const configError = error as ConfigError;
      expect(configError.issues.length).toBeGreaterThan(0);
      expect(configError.message).toContain('DATABASE_URL');
    }
  });
});

describe('envSchema', () => {
  it('validates a full env snapshot', () => {
    const result = envSchema.safeParse({ ...baseEnv, NODE_ENV: 'production' });
    expect(result.success).toBe(true);
  });

  it('rejects unknown node environments', () => {
    const result = envSchema.safeParse({ ...baseEnv, NODE_ENV: 'banana' });
    expect(result.success).toBe(false);
  });

  it('throws ConfigError when JWT secrets are missing', () => {
    expect(() => loadConfig({ env: { ...baseEnv, JWT_ACCESS_SECRET: undefined } })).toThrow(
      ConfigError,
    );
  });

  it('throws ConfigError on short JWT secrets', () => {
    expect(() => loadConfig({ env: { ...baseEnv, JWT_ACCESS_SECRET: 'short' } })).toThrow(
      ConfigError,
    );
  });

  it('throws ConfigError on malformed TTL values', () => {
    expect(() => loadConfig({ env: { ...baseEnv, JWT_ACCESS_TTL: '15 minutes' } })).toThrow(
      ConfigError,
    );
  });

  it('applies JWT defaults', () => {
    const config = loadConfig({ env: baseEnv });
    expect(config.JWT_ACCESS_TTL).toBe('15m');
    expect(config.JWT_REFRESH_TTL).toBe('30d');
    expect(config.EMAIL_VERIFICATION_TOKEN_TTL).toBe('24h');
    expect(config.SEARCH_CACHE_TTL).toBe('5m');
    expect(config.SEAT_HOLD_TTL).toBe('10m');
    expect(config.PUBLIC_BASE_URL).toBe('http://localhost:3000');
  });
});

describe('parseDuration', () => {
  it('parses seconds, minutes, hours, days', () => {
    expect(parseDuration('45s')).toBe(45);
    expect(parseDuration('15m')).toBe(900);
    expect(parseDuration('24h')).toBe(86_400);
    expect(parseDuration('30d')).toBe(2_592_000);
  });

  it('throws on invalid input', () => {
    expect(() => parseDuration('banana')).toThrow();
    expect(() => parseDuration('5')).toThrow();
  });
});
