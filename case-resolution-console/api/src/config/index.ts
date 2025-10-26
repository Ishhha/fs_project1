/**
 * index.ts
 * Typed config object derived from env.ts for app consumption.
 */

import env from './env';

const config = {
  nodeEnv: env.NODE_ENV,
  server: {
    port: env.PORT,
  },
  db: {
    host: env.PG_HOST,
    port: env.PG_PORT,
    user: env.PG_USER,
    password: env.PG_PASSWORD,
    database: env.PG_DATABASE,
  },
  redis: {
    url: env.REDIS_URL,
  },
  logging: {
    level: env.LOG_LEVEL,
  },
  cors: {
    origin: env.CORS_ORIGIN,
  },
  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
  },
  features: {
    enableLLM: env.ENABLE_LLM,
  },
};

export default config;
