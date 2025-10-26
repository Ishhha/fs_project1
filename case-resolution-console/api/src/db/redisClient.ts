/**
 * redisClient.ts
 * Minimal Redis client using `ioredis` style (we'll use `ioredis` or `redis` in package.json).
 * Exposes initRedis and a getClient function.
 */

import Redis from 'ioredis';
import config from '../config';
import { logger } from '../utils/logger';

let client: Redis.Redis | null = null;

export async function initRedis() {
  if (client) return client;
  client = new Redis(config.redis.url);

  client.on('connect', () => logger.info('Connected to Redis'));
  client.on('error', (err) => logger.error('Redis error', err));

  // simple readiness check
  await client.ping();
  return client;
}

export function getRedis() {
  if (!client) throw new Error('Redis not initialized. Call initRedis() first.');
  return client;
}

export async function closeRedis() {
  if (!client) return;
  await client.quit();
  client = null;
  logger.info('Redis connection closed');
}
