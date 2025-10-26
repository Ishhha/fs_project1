/**
 * postgres.ts
 * Small Postgres client using 'pg' package. Exposes init and basic query helper.
 *
 * Note: in production you might use Prisma or TypeORM. For this project we keep a lightweight client.
 */

import { Pool } from 'pg';
import config from '../config';
import { logger } from '../utils/logger';

let pool: Pool | null = null;

export async function initPostgres() {
  if (pool) return pool;
  pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    max: 10,
  });

  pool.on('error', (err) => {
    logger.error('Postgres client error', err);
  });

  // quick connectivity check
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
    logger.info('Connected to Postgres');
  } finally {
    client.release();
  }

  return pool;
}

export function getPool(): Pool {
  if (!pool) throw new Error('Postgres not initialized. Call initPostgres() first.');
  return pool;
}

export async function closePostgres() {
  if (!pool) return;
  await pool.end();
  pool = null;
  logger.info('Postgres connection closed');
}
