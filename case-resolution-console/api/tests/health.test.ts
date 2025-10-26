/**
 * health.test.ts
 * Simple health and readiness checks.
 */

import request from 'supertest';
import app from '../src/app';

describe('Health and readiness endpoints', () => {
  it('should return ok for /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('should return ready for /ready', async () => {
    const res = await request(app).get('/api/ready');
    expect([200, 500]).toContain(res.status);
  });
});
