/**
 * auth.ts
 * Simple API key auth middleware. Checks `x-api-key` header and sets req.auth.
 * For demo / local use. Replace with OAuth/JWT in real deployments.
 */

import { Request, Response, NextFunction } from 'express';
import config from '../config';
import { ApiError } from '../errors/ApiError';
import { logger } from '../utils/logger';

const STATIC_API_KEY = process.env.API_KEY || 'local-dev-key';

export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey = (req.header('x-api-key') || '').trim();
  if (!apiKey) {
    throw new ApiError(401, 'Missing API key', 'missing_api_key');
  }
  if (apiKey !== STATIC_API_KEY) {
    logger.warn('Invalid API key', { requestId: req.requestId, provided: !!apiKey });
    throw new ApiError(403, 'Invalid API key', 'invalid_api_key');
  }

  // Attach a simple auth object — in prod derive from token
  req.auth = {
    userId: 'agent-local',
    roles: ['agent'],
    apiKey: apiKey,
  };

  next();
}
