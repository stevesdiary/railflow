import { describe, expect, it } from 'vitest';
import { createTestConfig, createTestLogger } from '../src/index.js';

describe('testing helpers', () => {
  it('creates a test config', () => {
    const config = createTestConfig();
    expect(config.NODE_ENV).toBe('test');
    expect(config.DATABASE_URL).toContain('railflow_test');
    expect(config.LOG_LEVEL).toBe('silent');
  });

  it('merges overrides into the test config', () => {
    const config = createTestConfig({ API_PORT: 8080 });
    expect(config.API_PORT).toBe(8080);
  });

  it('creates a silent test logger', () => {
    const logger = createTestLogger();
    expect(logger.level).toBe('silent');
  });
});
