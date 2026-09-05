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
