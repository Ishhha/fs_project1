/**
 * requestId.ts
 * Adds a short requestId to each request for correlation.
 */

import { Request, Response, NextFunction } from 'express';
import { generateId } from '../utils/id';
import { logger } from '../utils/logger';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const rid = req.header('x-request-id') || generateId();
  req.requestId = rid;
  // also attach to response for client visibility
  res.setHeader('x-request-id', rid);
  // basic structured log per request start
  logger.info({ msg: 'req:start', method: req.method, path: req.path, requestId: rid });
  next();
}
