/**
 * kbDocs.ts
 * Simple repo to create/read kb docs for local/testing.
 */

import { getPool } from '../db/postgres';
import { generateId } from '../utils/id';

export const KbDocsRepo = {
  async upsert(title: string, body: string) {
    const id = generateId('kb');
    const pool = getPool();
    await pool.query(`INSERT INTO kb_docs (id, title, body, created_at) VALUES ($1, $2, $3, NOW())`, [id, title, body]);
    return { id, title, body, created_at: new Date().toISOString() };
  },

  async list(limit = 20) {
    const pool = getPool();
    const { rows } = await pool.query(`SELECT id, title, body FROM kb_docs ORDER BY created_at DESC LIMIT $1`, [limit]);
    return rows;
  },
};
