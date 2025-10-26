/**
 * fraudAgent.ts
 * A small deterministic rules engine that inspects transactions for simple fraud signals.
 */

import { TransactionRow } from '../models/customers';
import { InsightsResult } from './insightsAgent';

export type FraudResult = {
  score: number; // 0 - 100
  reasons: string[];
};

export async function runFraud(transactions: TransactionRow[], insights: InsightsResult): Promise<FraudResult> {
  let score = 0;
  const reasons: string[] = [];

  // velocity rule: if >5 tx in last 60 minutes -> high score
  const recentCount = transactions.filter((t) => {
    const occurred = new Date(t.occurred_at).getTime();
    return occurred >= Date.now() - 1000 * 60 * 60; // last 60 minutes
  }).length;
  if (recentCount >= 5) {
    score += 50;
    reasons.push(`velocity:${recentCount} in last 60m`);
  } else if (recentCount >= 3) {
    score += 20;
    reasons.push(`velocity:${recentCount}`);
  }

  // average amount spike rule (if any tx > 5x avg)
  const avg = insights.avgAmount || 1;
  const maxTx = transactions.reduce((m, t) => Math.max(m, Math.abs(Number(t.amount || 0))), 0);
  if (maxTx > avg * 5 && avg > 0) {
    score += 30;
    reasons.push(`amount_spike: ${maxTx.toFixed(2)} > 5x avg ${avg.toFixed(2)}`);
  }

  // concentration rule: single merchant > 60% of txs
  const top = insights.topMerchants[0];
  if (top && top.count / Math.max(1, insights.txCount) > 0.6) {
    score += 10;
    reasons.push(`merchant_concentration:${top.merchant}`);
  }

  if (score > 100) score = 100;
  return { score, reasons };
}
