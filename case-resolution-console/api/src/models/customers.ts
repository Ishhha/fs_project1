/**
 * customers.ts
 * Minimal repository layer for customers and transactions.
 * Uses the pg Pool from db/postgres.ts
 */

import { getPool } from '../db/postgres';

export type Customer = {
  id: string;
  name: string;
  email?: string | null;
  created_at?: string;
};

export type TransactionRow = {
  id: string;
  customer_id: string;
  amount: number;
  merchant: string;
  category: string;
  occurred_at: string;
};

export const CustomersRepo = {
  async getById(id: string): Promise<Customer | null> {
    const pool = getPool();
    const { rows } = await pool.query('SELECT id, name, email, created_at FROM customers WHERE id = $1 LIMIT 1', [id]);
    return rows[0] || null;
  },

  /**
   * Keyset pagination for transactions:
   * - `limit` number of rows
   * - `after` is the last seen occurred_at timestamp (ISO string) and id combined for uniqueness
   *
   * We return rows in DESC order (most recent first).
   */
  async listTransactionsKeyset(customerId: string, limit = 50, after?: { occurred_at: string; id: string }) {
    const pool = getPool();

    if (!after) {
      const { rows } = await pool.query(
        `SELECT id, customer_id, amount, merchant, category, occurred_at
         FROM transactions
         WHERE customer_id = $1
         ORDER BY occurred_at DESC, id DESC
         LIMIT $2`,
        [customerId, limit]
      );
      return rows as TransactionRow[];
    }

    // paginate: fetch rows strictly before the (occurred_at, id) tuple
    const { rows } = await pool.query(
      `SELECT id, customer_id, amount, merchant, category, occurred_at
       FROM transactions
       WHERE customer_id = $1
         AND (occurred_at < $2 OR (occurred_at = $2 AND id < $3))
       ORDER BY occurred_at DESC, id DESC
       LIMIT $4`,
      [customerId, after.occurred_at, after.id, limit]
    );
    return rows as TransactionRow[];
  },
};
