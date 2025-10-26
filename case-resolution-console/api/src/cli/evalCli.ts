#!/usr/bin/env node
/**
 * evalCli.ts
 * A simple CLI to run triage runs against fixture customer ids and produce a basic report.
 */

import fs from 'fs';
import path from 'path';
import { runTriage } from '../services/triageService';
import { generateId } from '../utils/id';

async function runForCustomer(customerId: string) {
  return new Promise<{ customerId: string; decision?: any }>((resolve) => {
    const decisions: any[] = [];
    const runId = generateId('evalrun');
    const cb = (ev: any) => {
      if (ev.type === 'decision_finalized') {
        decisions.push(ev.payload);
      }
    };
    runTriage(customerId, runId, cb)
      .then(() => resolve({ customerId, decision: decisions[0] || null }))
      .catch((err) => resolve({ customerId, decision: { error: String(err) } }));
  });
}

async function main() {
  const args = process.argv.slice(2);
  const targets: string[] = [];
  for (const a of args) {
    if (fs.existsSync(a) && fs.statSync(a).isFile()) {
      try {
        const content = fs.readFileSync(a, 'utf8');
        const parsed = JSON.parse(content);
        if (parsed.customerId) targets.push(parsed.customerId);
      } catch {
        // ignore
      }
    } else {
      targets.push(a);
    }
  }

  if (targets.length === 0) {
    console.log('Usage: evalCli.ts <customerId|evalFile.json> ...');
    process.exit(1);
  }

  const results = [];
  console.log(`Running ${targets.length} evals...`);
  for (const t of targets) {
    // run serially for deterministic results
    // eslint-disable-next-line no-await-in-loop
    const r = await runForCustomer(t);
    results.push(r);
    console.log(`-> ${t}: ${JSON.stringify(r.decision)}`);
  }

  const decisionsCount: Record<string, number> = {};
  for (const r of results) {
    const key = r.decision && r.decision.action ? r.decision.action : 'error_or_none';
    decisionsCount[key] = (decisionsCount[key] || 0) + 1;
  }
  console.log('Summary:', decisionsCount);
}

main().catch((err) => {
  console.error('Eval CLI error', err);
  process.exit(1);
});
