/**
 * kbAgent.ts
 * Simple in-memory KB lookup utility that matches query tokens against KB docs.
 */

import { getPool } from '../db/postgres';
import { logger } from '../utils/logger';

export type KbHit = {
  id: string;
  title: string;
  snippet: string;
  source?: string;
};

export async function lookupKb(query: string, limit = 3): Promise<KbHit[]> {
  try {
    const pool = getPool();
    const q = `%${query.replace(/%/g, '\%')}%`;
    const { rows } = await pool.query(
      `SELECT id, title, body FROM kb_docs WHERE (title ILIKE $1 OR body ILIKE $1) LIMIT $2`,
      [q, limit]
    );
    return (rows || []).map((r: any) => ({
      id: r.id,
      title: r.title,
      snippet: (r.body || '').slice(0, 240),
      source: 'kb_docs',
    }));
  } catch (err) {
    logger.warn('KB lookup failed (likely missing table or DB not seeded)', err);
    return [];
  }
}
