import pino from 'pino';

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent';

export interface LoggerOptions {
  level?: LogLevel;
  name?: string;
  redactPaths?: string[];
  pretty?: boolean;
  base?: Record<string, unknown>;
}

export const DEFAULT_REDACT_PATHS = [
  'password',
  'passwordConfirm',
  'currentPassword',
  'newPassword',
  'accessToken',
  'refreshToken',
  'authorization',
  'cookie',
  'cardNumber',
  'cvv',
  'secret',
  'apiKey',
];

export function createLoggerOptions(options: LoggerOptions = {}): pino.LoggerOptions {
  const {
    level = 'info',
    name = 'railflow',
    redactPaths = DEFAULT_REDACT_PATHS,
    pretty = false,
    base,
  } = options;

  const config: pino.LoggerOptions = {
    name,
    level,
    redact: {
      paths: redactPaths,
      censor: '[REDACTED]',
    },
    base: base ?? { pid: process.pid },
    timestamp: pino.stdTimeFunctions.isoTime,
  };

  if (pretty) {
    config.transport = {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'SYS:standard', ignore: 'pid,hostname' },
    };
  }

  return config;
}

export function createLogger(options: LoggerOptions = {}): pino.Logger {
  return pino(createLoggerOptions(options));
}

export type { pino };
