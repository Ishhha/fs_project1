/**
 * customers.ts
 * Router for customer endpoints.
 */

import { Router } from 'express';
import { getCustomer, listTransactions } from '../controllers/customersController';
import { apiKeyMiddleware } from '../middleware/auth';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Protected routes — require API key and rate limiting
router.get('/:id', apiKeyMiddleware, getCustomer);
router.get('/:id/transactions', apiKeyMiddleware, rateLimiter, listTransactions);

export default router;
