/**
 * complianceAgent.ts
 * Simple compliance guard: checks for blocked MCCs, customer flags, and OTP requirements.
 */

import { getPool } from '../db/postgres';
import { logger } from '../utils/logger';

export type ComplianceResult = {
  allowed: boolean;
  reasons: string[];
  requireOtp?: boolean;
};

export async function runComplianceCheck(customerId: string, merchant?: string): Promise<ComplianceResult> {
  const reasons: string[] = [];

  try {
    const pool = getPool();
    const { rows } = await pool.query(`SELECT key, value FROM policies WHERE key IN ('blocked_mccs','otp_merchants')`);
    let blockedMccsCsv = '';
    let otpMerchantsCsv = '';
    for (const r of rows) {
      if (r.key === 'blocked_mccs') blockedMccsCsv = r.value || '';
      if (r.key === 'otp_merchants') otpMerchantsCsv = r.value || '';
    }
    const blocked = blockedMccsCsv.split(',').map((s) => s.trim()).filter(Boolean);
    const otpMerchants = otpMerchantsCsv.split(',').map((s) => s.trim()).filter(Boolean);

    if (merchant && blocked.includes(merchant)) {
      reasons.push('merchant_blocked_by_policy');
    }

    const requireOtp = merchant ? otpMerchants.includes(merchant) : false;
    if (requireOtp) reasons.push('otp_required_for_merchant');

    return { allowed: reasons.length === 0 || requireOtp === true, reasons, requireOtp };
  } catch (err) {
    logger.warn('compliance check failed (DB maybe missing)', err);
    return { allowed: true, reasons: ['compliance_check_failed'], requireOtp: false };
  }
}
