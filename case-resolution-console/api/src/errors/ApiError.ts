/**
 * ApiError.ts
 * Centralized API error handling types + Express middleware for consistent errors.
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class ApiError extends Error {
  public status: number;
  public code?: string;
  public details?: any;

  constructor(status: number, message: string, code?: string, details?: any) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Express error handler to return structured JSON errors and log them.
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    logger.warn('API error', { status: err.status, code: err.code, message: err.message });
    res.status(err.status).json({ error: { message: err.message, code: err.code, details: err.details } });
    return;
  }

  logger.error('Unhandled error', err);
  res.status(500).json({ error: { message: 'Internal server error' } });
}
