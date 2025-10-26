/**
 * id.ts
 * Small id helper. Uses Node's crypto.randomUUID if available.
 */

export function generateId(prefix = ''): string {
  // crypto.randomUUID exists in modern Node. Fallback to timestamp+random.
  const base = (globalThis as any).crypto?.randomUUID?.() ||
    `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
  return prefix ? `${prefix}_${base}` : base;
}
