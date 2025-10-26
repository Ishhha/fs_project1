/**
 * queue.ts
 * Minimal in-memory queue + Redis placeholder.
 */

import { getRedis } from '../db/redisClient';
import { logger } from '../utils/logger';

export async function enqueueJob(queueName: string, payload: any) {
  try {
    const r = getRedis();
    await r.lpush(`queue:${queueName}`, JSON.stringify(payload));
    logger.info('enqueued job', { queueName, payload });
  } catch (err) {
    logger.warn('Redis unavailable, falling back to console enqueue', err);
    process.nextTick(() => {
      logger.info('fallback queue processing', payload);
    });
  }
}

export async function dequeueJob(queueName: string) {
  const r = getRedis();
  const raw = await r.rpop(`queue:${queueName}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
