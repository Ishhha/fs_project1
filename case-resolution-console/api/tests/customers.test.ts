/**
 * customers.test.ts
 * Integration test for customer routes.
 */

import request from 'supertest';
import app from '../src/app';

const API_KEY = process.env.API_KEY || 'local-dev-key';

describe('Customer API', () => {
  it('should reject without API key', async () => {
    const res = await request(app).get('/api/customers/1');
    expect(res.status).toBe(401);
  });

  it('should return not found for invalid ID', async () => {
    const res = await request(app)
      .get('/api/customers/nonexistent')
      .set('x-api-key', API_KEY);
    expect([404, 500]).toContain(res.status);
  });
});
