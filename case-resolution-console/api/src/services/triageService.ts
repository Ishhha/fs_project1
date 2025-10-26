/**
 * triageService.ts
 * Orchestrator shim for triage runs.
 */

import { generateId } from '../utils/id';
import { Customer, CustomersRepo } from '../models/customers';

export type TriageEvent =
  | { type: 'plan_built'; payload: { planId: string; summary: string } }
  | { type: 'tool_update'; payload: { tool: string; status: 'ok' | 'failed'; detail?: string } }
  | { type: 'fallback_triggered'; payload: { reason: string; fallback: string } }
  | { type: 'decision_finalized'; payload: { action: string; reason: string; citation?: { source: string; id: string } } };

export type EventCallback = (ev: TriageEvent) => void;

export async function runTriage(customerId: string, runId: string, cb: EventCallback) {
  const customer: Customer | null = await CustomersRepo.getById(customerId);

  const planId = generateId('plan');
  cb({ type: 'plan_built', payload: { planId, summary: `Run plan for customer ${customerId}` } });

  // simulate insights agent
  await delay(250);
  cb({ type: 'tool_update', payload: { tool: 'insights_agent', status: 'ok', detail: 'Behavior: normal' } });

  // simulate fraud agent (occasionally fail deterministically based on runId hash)
  await delay(300);
  const failFraud = runId.endsWith('a') || runId.endsWith('0'); // deterministic-ish
  if (failFraud) {
    cb({ type: 'tool_update', payload: { tool: 'fraud_agent', status: 'failed', detail: 'Timeout' } });
    cb({ type: 'fallback_triggered', payload: { reason: 'fraud_agent_timeout', fallback: 'rule_based_flag' } });
    await delay(150);
    cb({ type: 'tool_update', payload: { tool: 'rule_engine', status: 'ok', detail: 'Rule: velocity matched' } });
  } else {
    cb({ type: 'tool_update', payload: { tool: 'fraud_agent', status: 'ok', detail: 'High risk: velocity' } });
  }

  // KB lookup
  await delay(200);
  const citation = { source: 'kb_docs', id: 'kb-123' };
  cb({ type: 'tool_update', payload: { tool: 'kb_lookup', status: 'ok', detail: 'KB match: duplicate merchant' } });

  // final decision: freeze or no-op based on simple heuristic
  await delay(200);
  const action = failFraud ? 'flag_for_manual_review' : 'recommend_freeze';
  const reason = failFraud ? 'tool_failure_fallback' : 'fraud_signals_high';

  cb({ type: 'decision_finalized', payload: { action, reason, citation } });
  return;
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
