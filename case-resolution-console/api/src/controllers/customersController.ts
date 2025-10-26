/**
 * customersController.ts
 * Controllers for customer-related endpoints:
 *  - GET /api/customers/:id
 *  - GET /api/customers/:id/transactions
 */

// Avoid importing Express types directly to keep this file runnable
// even when @types/express is not installed in the environment.
// Use `any` for request/response/next to prevent TS errors during quick iteration.
import { CustomersRepo } from '../models/customers';
import { ApiError } from '../errors/ApiError';

export async function getCustomer(req: any, res: any, next: any) {
  try {
    const id = req.params.id;
    const customer = await CustomersRepo.getById(id);
    if (!customer) throw new ApiError(404, 'Customer not found', 'not_found');
    res.json({ data: customer });
  } catch (err) {
    next(err);
  }
}

/**
 * Query params:
 *  - limit (number)
 *  - after_occurred_at (ISO)
 *  - after_id (string)
 */
export async function listTransactions(req: any, res: any, next: any) {
  try {
    const id = req.params.id;
    const limit = Math.min(Number(req.query.limit || 50), 200);
    const afterOccurredAt = req.query.after_occurred_at as string | undefined;
    const afterId = req.query.after_id as string | undefined;

    const after = afterOccurredAt && afterId ? { occurred_at: afterOccurredAt, id: afterId } : undefined;
    const rows = await CustomersRepo.listTransactionsKeyset(id, limit, after);

    res.json({
      meta: {
        count: rows.length,
        limit,
      },
      data: rows,
    });
  } catch (err) {
    next(err);
  }
}
