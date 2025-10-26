/**
 * triage.ts
 * Router for triage endpoints.
 */

import { Router } from 'express';
import { startTriageSSE } from '../controllers/triageController';
import { apiKeyMiddleware } from '../middleware/auth';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

// POST /api/triage/start — start a triage run and stream events via SSE
router.post('/start', apiKeyMiddleware, rateLimiter, startTriageSSE);

export default router;
