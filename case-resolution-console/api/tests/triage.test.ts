/**
 * triage.test.ts
 * Simulates a triage SSE call and ensures stream returns events.
 */

import request from 'supertest';
import app from '../src/app';

const API_KEY = process.env.API_KEY || 'local-dev-key';

describe('Triage SSE', () => {
  it('should stream triage events', async () => {
    const res = await request(app)
      .post('/api/triage/start')
      .set('x-api-key', API_KEY)
      .send({ customerId: '1' })
      .buffer(true)
      .parse((res, cb) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => cb(null, data));
      });

    expect(res.status).toBe(200);
    expect(res.text).toContain('event: plan_built');
  });
});
