/**
 * pagination.ts
 * Helper to parse keyset pagination params and produce an `after` tuple.
 */

export function parseKeysetAfter(afterOccurredAt?: string | undefined, afterId?: string | undefined) {
  if (!afterOccurredAt || !afterId) return undefined;
  const d = new Date(afterOccurredAt);
  if (isNaN(d.getTime())) return undefined;
  return { occurred_at: d.toISOString(), id: String(afterId) };
}
