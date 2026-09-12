export const STATUS_STYLES = {
  'On Track': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  'At Risk': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  'Delayed': { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  'Completed': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Pending': { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
  'Partially Paid': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  'Paid': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  'Verified': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  'Pending Review': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  'Rejected': { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  'Proposed': { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' },
  'Under Scrutiny': { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  'Approved': { bg: 'bg-sky-100', text: 'text-sky-700', dot: 'bg-sky-500' },
  'Notice Issued': { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  'Awarded': { bg: 'bg-violet-100', text: 'text-violet-700', dot: 'bg-violet-500' },
  'Compensation': { bg: 'bg-pink-100', text: 'text-pink-700', dot: 'bg-pink-500' },
  'Possession': { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  High: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  Medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  Low: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
};

export function getStatusStyle(status) {
  return STATUS_STYLES[status] || STATUS_STYLES['Pending'];
}

export function riskLabel(score) {
  if (score >= 7) return 'High Risk';
  if (score >= 4) return 'Medium Risk';
  return 'Low Risk';
}
