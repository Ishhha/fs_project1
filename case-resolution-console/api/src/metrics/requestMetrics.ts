/**
 * requestMetrics.ts
 * Express middleware to record simple request counts and latency.
 */

import { Request, Response, NextFunction } from 'express';
import { incCounter } from './index';
import { logger } from '../utils/logger';

export function requestMetricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    const route = req.route ? (req.route.path || req.path) : req.path;
    const method = req.method || 'GET';
    incCounter(`http_requests_total{method="${method}",route="${route}",status="${res.statusCode}"}`, {}, 1);
    incCounter('http_request_duration_ms', {}, elapsed);
    logger.debug('req:metrics', { route, method, status: res.statusCode, duration: elapsed });
  });
  next();
}
