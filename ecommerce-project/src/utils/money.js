// So this file contains utilities (or code) that helps us work with money.
export function formatMoney(amountCents) {
  const formatted = (Math.abs(amountCents) / 100).toFixed(2);
  return amountCents < 0 ? `-$${formatted}` : `$${formatted}`;
}