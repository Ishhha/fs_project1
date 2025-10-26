/**
 * transactions.ts
 * Repo helpers for transactions: insert, find duplicates, etc.
 */

import { getPool } from '../db/postgres';
import { TransactionRow } from './customers';

export const TransactionsRepo = {
  async insertMany(rows: TransactionRow[]) {
    if (rows.length === 0) return;
    const pool = getPool();
    const values: string[] = [];
    const params: any[] = [];
    let idx = 1;
    for (const r of rows) {
      values.push(`($${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++}, $${idx++})`);
      params.push(r.id, r.customer_id, r.amount, r.merchant, r.category, r.occurred_at);
    }
    const sql = `INSERT INTO transactions (id, customer_id, amount, merchant, category, occurred_at) VALUES ${values.join(
      ','
    )} ON CONFLICT DO NOTHING`;
    await pool.query(sql, params);
  },

  async findDuplicates(customerId: string, amount: number, thresholdSeconds = 60) {
    const pool = getPool();
    const { rows } = await pool.query(
      `SELECT id, customer_id, amount, merchant, category, occurred_at
       FROM transactions
       WHERE customer_id = $1 AND amount = $2
         AND occurred_at >= (NOW() - ($3 || ' seconds')::interval)
       LIMIT 10`,
      [customerId, amount, thresholdSeconds]
    );
    return rows as TransactionRow[];
  },
};
