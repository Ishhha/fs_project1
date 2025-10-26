/**
 * env.ts
 * Safe env extraction + defaults. Keeps the rest of the app typed and predictable.
 */

import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? Number(process.env.PORT) : 4000,
  PG_HOST: process.env.PG_HOST || 'localhost',
  PG_PORT: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
  PG_USER: process.env.PG_USER || 'postgres',
  PG_PASSWORD: process.env.PG_PASSWORD || 'postgres',
  PG_DATABASE: process.env.PG_DATABASE || 'case_resolution',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS ? Number(process.env.RATE_LIMIT_WINDOW_MS) : 1000,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX ? Number(process.env.RATE_LIMIT_MAX) : 5,
  // feature flags
  ENABLE_LLM: process.env.ENABLE_LLM === 'true' || false,
};
