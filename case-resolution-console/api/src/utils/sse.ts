/**
 * sse.ts
 * Small helper to write SSE frames and manage connection lifecycle.
 */

import { Response } from 'express';

export function sseInit(res: Response) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
}

export function sseSend(res: Response, event: string, payload: any) {
  const d = JSON.stringify(payload || {});
  res.write(`event: ${event}\n`);
  res.write(`data: ${d}\n\n`);
}
