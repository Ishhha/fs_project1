/**
 * triageController.ts
 * Starts a triage run and streams SSE events to the client.
 */

import { Request, Response, NextFunction } from 'express';
import { runTriage } from '../services/triageService';
import { generateId } from '../utils/id';

export async function startTriageSSE(req: Request, res: Response, next: NextFunction) {
  try {
    const customerId = (req.body && req.body.customerId) || req.query.customerId;
    if (!customerId) {
      return res.status(400).json({ error: 'customerId required' });
    }

    // prepare SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // new run id
    const runId = generateId('run');

    // helper to write SSE frames
    const writeEvent = (evType: string, payload: any) => {
      const data = JSON.stringify(payload);
      res.write(`event: ${evType}\n`);
      // keep each data chunk on its own line — sse spec uses "data: "
      res.write(`data: ${data}\n\n`);
    };

    // Handlers for triage events
    const cb = (ev: any) => {
      switch (ev.type) {
        case 'plan_built':
          writeEvent('plan_built', ev.payload);
          break;
        case 'tool_update':
          writeEvent('tool_update', ev.payload);
          break;
        case 'fallback_triggered':
          writeEvent('fallback_triggered', ev.payload);
          break;
        case 'decision_finalized':
          writeEvent('decision_finalized', ev.payload);
          // after final decision close connection gracefully
          res.write('event: done\n');
          res.write('data: {}\n\n');
          res.end();
          break;
        default:
          writeEvent('unknown', ev);
      }
    };

    // run the triage orchestrator (async)
    runTriage(String(customerId), runId, cb).catch((err) => {
      // inform client about the error and close stream
      writeEvent('error', { message: String(err) });
      res.end();
    });
  } catch (err) {
    next(err);
  }
}
