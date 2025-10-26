/**
 * cases.ts
 * CRUD for cases and case_events (audit trail).
 */

import { getPool } from '../db/postgres';
import { generateId } from '../utils/id';

export type CaseRow = {
  id: string;
  customer_id: string;
  status: 'open' | 'closed' | 'pending';
  reason?: string;
  created_at?: string;
};

export const CasesRepo = {
  async createCase(customerId: string, initialReason?: string) {
    const pool = getPool();
    const id = generateId('case');
    await pool.query(
      `INSERT INTO cases (id, customer_id, status, reason, created_at) VALUES ($1, $2, $3, $4, NOW())`,
      [id, customerId, 'open', initialReason || null]
    );
    await pool.query(
      `INSERT INTO case_events (case_id, event_type, payload, created_at) VALUES ($1, $2, $3, NOW())`,
      [id, 'case_created', JSON.stringify({ reason: initialReason })]
    );
    return { id, customer_id: customerId, status: 'open', reason: initialReason, created_at: new Date().toISOString() };
  },

  async appendEvent(caseId: string, eventType: string, payload: any) {
    const pool = getPool();
    await pool.query(`INSERT INTO case_events (case_id, event_type, payload, created_at) VALUES ($1, $2, $3, NOW())`, [
      caseId,
      eventType,
      JSON.stringify(payload || {}),
    ]);
  },
};
