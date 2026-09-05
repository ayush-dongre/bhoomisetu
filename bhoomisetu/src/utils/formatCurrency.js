export function formatCrore(value) {
  if (value === null || value === undefined) return '-';
  return `₹${Number(value).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr`;
}

export function formatLakh(value) {
  if (value === null || value === undefined) return '-';
  return `₹${Number(value).toLocaleString('en-IN', { maximumFractionDigits: 2 })} L`;
}

export function formatNumber(value) {
  if (value === null || value === undefined) return '-';
  return Number(value).toLocaleString('en-IN');
}
