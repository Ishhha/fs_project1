/**
 * healthController.ts
 * Provides a slightly richer health endpoint using DB readiness checks.
 */

import { Request, Response } from 'express';
import { getPool } from '../db/postgres';
import { getRedis } from '../db/redisClient';

export async function readiness(req: Request, res: Response) {
  try {
    const pool = getPool();
    const redis = getRedis();
    // quick checks
    await pool.query('SELECT 1');
    await redis.ping();
    res.json({ ready: true, db: 'ok', redis: 'ok' });
  } catch (err) {
    res.status(500).json({ ready: false, error: String(err) });
  }
}
