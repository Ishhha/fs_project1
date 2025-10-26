/**
 * policies.ts
 * Simple key/value policy store repo.
 */

import { getPool } from '../db/postgres';

export const PoliciesRepo = {
  async set(key: string, value: string) {
    const pool = getPool();
    await pool.query(
      `INSERT INTO policies (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
      [key, value]
    );
  },

  async get(key: string) {
    const pool = getPool();
    const { rows } = await pool.query(`SELECT value FROM policies WHERE key = $1 LIMIT 1`, [key]);
    return rows[0] ? rows[0].value : null;
  },

  async listAll() {
    const pool = getPool();
    const { rows } = await pool.query(`SELECT key, value FROM policies`);
    return rows;
  },
};
