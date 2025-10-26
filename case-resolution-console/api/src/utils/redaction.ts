/**
 * redaction.ts
 * Utility to redact sensitive tokens (PAN-like sequences and emails).
 */

const PAN_REGEX = /\b(?:\d[ -]*?){13,19}\b/g;
const EMAIL_REGEX = /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

export function redactString(s: string): string {
  if (!s) return s;
  return s.replace(PAN_REGEX, '[REDACTED_PAN]').replace(EMAIL_REGEX, '[REDACTED_EMAIL]');
}

export function redactObj(obj: any): any {
  if (obj == null) return obj;
  if (typeof obj === 'string') return redactString(obj);
  if (typeof obj === 'number' || typeof obj === 'boolean') return obj;
  if (Array.isArray(obj)) return obj.map(redactObj);
  if (typeof obj === 'object') {
    const out: any = {};
    for (const k of Object.keys(obj)) {
      out[k] = redactObj(obj[k]);
    }
    return out;
  }
  return obj;
}
