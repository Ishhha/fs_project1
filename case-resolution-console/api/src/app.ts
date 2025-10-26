/**
 * app.ts
 * Express application setup: middlewares, health routes, mounting routers.
 */

import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';
import { logger, stream as loggerStream } from './utils/logger';
import { errorHandler } from './errors/ApiError';
import apiRoutes from './routes';
import { requestIdMiddleware } from './middleware/requestId';
import { requestMetricsMiddleware } from './metrics/requestMetrics';
import { metricsRouter } from './metrics';

const app = express();

// Basic security + perf
app.use(helmet());
app.use(compression());

// Request parsing
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({ origin: config.cors.origin, credentials: true }));

// Logging via morgan -> logger
app.use(morgan('combined', { stream: loggerStream }));

// requestId
app.use(requestIdMiddleware);

// metrics middleware
app.use(requestMetricsMiddleware);

// mount metrics endpoint first
app.use('/', metricsRouter());

// Mount API routes
app.use('/api', apiRoutes);

// Error handler (last)
app.use(errorHandler);

export default app;

