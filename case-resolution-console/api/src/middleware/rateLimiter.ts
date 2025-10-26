/**
 * rateLimiter.ts
 * Simple Redis-backed token-bucket limiter keyed by api key or IP.
 * Uses Redis INCR + EXPIRE semantics to enforce a windowed request limit.
 */

import { Request, Response, NextFunction } from 'express';
import { getRedis } from '../db/redisClient';
import config from '../config';
import { ApiError } from '../errors/ApiError';

export async function rateLimiter(req: Request, res: Response, next: NextFunction) {
  try {
    const redis = getRedis();
    const key = `rl:${(req.auth?.apiKey) || req.ip}`;
    const current = await redis.incr(key);
    if (current === 1) {
      // set TTL
      await redis.pexpire(key, config.rateLimit.windowMs);
    }
    if (current > config.rateLimit.max) {
      const ttl = await redis.pttl(key);
      res.setHeader('Retry-After', Math.ceil((ttl || 0) / 1000));
      throw new ApiError(429, 'Rate limit exceeded', 'rate_limit_exceeded', { limit: config.rateLimit.max });
    }
    next();
  } catch (err) {
    next(err);
  }
}
