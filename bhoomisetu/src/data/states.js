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

  // 7-stage land-parcel acquisition pipeline (see data/parcels.js ACQ_STATUS).
  // Hex values are kept alongside so map polygons/legend can use the exact
  // same colour without re-deriving it from a Tailwind class string.
  'Proposed': { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400', hex: '#94a3b8' },
  'Under Scrutiny': { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', hex: '#f59e0b' },
  'Approved': { bg: 'bg-sky-100', text: 'text-sky-700', dot: 'bg-sky-500', hex: '#0ea5e9' },
  'Notice Issued': { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500', hex: '#6366f1' },
  'Awarded': { bg: 'bg-violet-100', text: 'text-violet-700', dot: 'bg-violet-500', hex: '#8b5cf6' },
  'Compensation': { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500', hex: '#ff891f' },
  'Possession': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', hex: '#22c55e' },
};

export function getStatusStyle(status) {
  return STATUS_STYLES[status] || STATUS_STYLES['Pending'];
}

// Ordered pipeline used by the GIS map legend and the parcel acquisition
// progress stepper. Duplicated here (not imported from data/parcels.js) to
// keep utils/ free of a dependency on data/ and avoid a circular import,
// since data/parcels.js itself imports geo helpers from utils/.
export const ACQUISITION_STAGES = [
  'Proposed',
  'Under Scrutiny',
  'Approved',
  'Notice Issued',
  'Awarded',
  'Compensation',
  'Possession',
];

export function stageIndexOf(status) {
  const idx = ACQUISITION_STAGES.indexOf(status);
  return idx === -1 ? 0 : idx;
}

export function riskLabel(score) {
  if (score >= 7) return 'High Risk';
  if (score >= 4) return 'Medium Risk';
  return 'Low Risk';
}