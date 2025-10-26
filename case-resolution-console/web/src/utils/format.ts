/**
 * format.ts
 * Small formatting helpers for dates, currency, etc.
 */

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}
