/**
 * express.d.ts
 * Extend Express Request with custom fields (e.g., requestId, auth info).
 * Ensure this file is included in tsconfig "typeRoots" or via "include".
 */

import express from 'express';

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      auth?: {
        userId: string;
        roles: string[];
        apiKey?: string;
      };
      runId?: string; // for triage/session correlation
    }
  }
}
