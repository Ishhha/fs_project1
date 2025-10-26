/**
 * metrics/index.ts
 * Lightweight metrics wrapper.
 */

import express from 'express';
import { logger } from '../utils/logger';

type CounterMap = Record<string, number>;
const counters: CounterMap = {};

export function incCounter(name: string, labels?: Record<string, string>, v = 1) {
  counters[name] = (counters[name] || 0) + v;
}

export function getMetricsText() {
  return Object.entries(counters)
    .map(([k, v]) => `${k} ${v}`)
    .join('\n') + '\n';
}

export function metricsRouter() {
  const r = express.Router();
  r.get('/metrics', (_req, res) => {
    try {
      res.setHeader('Content-Type', 'text/plain; version=0.0.4');
      res.send(getMetricsText());
    } catch (err) {
      logger.warn('Error serving metrics', err);
      res.status(500).send('error');
    }
  });
  return r;
}
