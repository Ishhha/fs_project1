/**
 * insightsAgent.ts
 * Deterministic insights generator:
 * - Summarizes transaction distribution and returns simple signals.
 */

import { TransactionRow } from '../models/customers';

export type InsightsResult = {
  merchantCounts: Record<string, number>;
  topMerchants: { merchant: string; count: number }[];
  avgAmount: number;
  txCount: number;
};

export async function runInsights(transactions: TransactionRow[]): Promise<InsightsResult> {
  const merchantCounts: Record<string, number> = {};
  let sum = 0;
  for (const t of transactions) {
    merchantCounts[t.merchant] = (merchantCounts[t.merchant] || 0) + 1;
    sum += Number(t.amount || 0);
  }
  const txCount = transactions.length;
  const avgAmount = txCount === 0 ? 0 : sum / txCount;

  const topMerchants = Object.entries(merchantCounts)
    .map(([merchant, count]) => ({ merchant, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return { merchantCounts, topMerchants, avgAmount, txCount };
}
