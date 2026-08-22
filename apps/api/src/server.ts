import 'dotenv/config';
import { loadConfig } from '@railflow/config';
import { buildApp } from './app.js';

const config = loadConfig();
const app = buildApp({ config });

async function start(): Promise<void> {
  try {
    await app.listen({ host: config.API_HOST, port: config.API_PORT });
    app.log.info(
      { host: config.API_HOST, port: config.API_PORT, env: config.NODE_ENV },
      'API listening',
    );
  } catch (error) {
    app.log.fatal({ err: error }, 'Failed to start API');
    process.exit(1);
  }
}

async function shutdown(signal: NodeJS.Signals): Promise<void> {
  app.log.info({ signal }, 'Shutdown signal received');
  try {
    await app.close();
    app.log.info('Shutdown complete');
    process.exit(0);
  } catch (error) {
    app.log.error({ err: error }, 'Error during shutdown');
    process.exit(1);
  }
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

void start();
