/**
 * index.ts
 * Mounts routers and health/readiness endpoints.
 */

import { Router } from 'express';
import customersRouter from './customers';
import triageRouter from './triage';
import { readiness } from '../controllers/healthController';

const router = Router();

router.get('/ready', readiness);

// mount
router.use('/customers', customersRouter);
router.use('/triage', triageRouter);

export default router;
