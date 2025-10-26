/**
 * index.ts
 * Server entrypoint — creates HTTP server and starts listening.
 * Loads env, connects to DB/Redis, and gracefully handles shutdown.
 */

import app from './app';
import { logger } from './utils/logger';
import { initPostgres, closePostgres } from './db/postgres';
import { initRedis, closeRedis } from './db/redisClient';
import config from './config';

const PORT = config.server.port;

async function start() {
  try {
    logger.info(`Starting application — environment=${config.nodeEnv}`);
    await initPostgres();
    await initRedis();

    const server = app.listen(PORT, () => {
      logger.info(`API server listening on port ${PORT}`);
    });

    const shutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Shutting down...`);
      server.close(async (err?: Error) => {
        if (err) {
          logger.error('Error while closing server', err);
          process.exit(1);
        }
        try {
          await closeRedis();
          await closePostgres();
          logger.info('Shutdown complete.');
          process.exit(0);
        } catch (e) {
          logger.error('Error during shutdown cleanup', e);
          process.exit(1);
        }
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (err) {
    logger.error('Failed to start', err);
    process.exit(1);
  }
}

  start();
