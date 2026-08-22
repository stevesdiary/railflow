import { describe, expect, it } from 'vitest';
import { createLogger, DEFAULT_REDACT_PATHS } from '../src/index.js';

describe('createLogger', () => {
  it('creates a logger with default level info', () => {
    const logger = createLogger({ level: 'silent' });
    expect(logger.level).toBe('silent');
  });

  it('applies requested level', () => {
    const logger = createLogger({ level: 'debug' });
    expect(logger.level).toBe('debug');
  });

  it('exports default redaction paths covering sensitive fields', () => {
    expect(DEFAULT_REDACT_PATHS).toContain('password');
    expect(DEFAULT_REDACT_PATHS).toContain('accessToken');
    expect(DEFAULT_REDACT_PATHS).toContain('authorization');
    expect(DEFAULT_REDACT_PATHS).toContain('apiKey');
  });

  it('logs and redacts sensitive values', async () => {
    const lines: Array<Record<string, unknown>> = [];
    const logger = createLogger({
      level: 'info',
      pretty: false,
      redactPaths: ['password'],
    });

    logger.info({ password: 'super-secret', user: 'alice' }, 'test message');
    logger.flush();

    const raw = JSON.stringify(lines);
    expect(raw).not.toContain('super-secret');
  });
});
