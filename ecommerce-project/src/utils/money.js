// So this file contains utilities (or code) that helps us work with money.
export function formatMoney(amountCents) {
  return `$${(amountCents / 100).toFixed(2)}`;
}