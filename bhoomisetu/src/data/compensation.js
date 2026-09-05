import { PARCELS } from './parcels';
import { PROJECTS } from './projects';

export const RR_PACKAGES = ['Land for Land', 'Employment', 'Annuity', 'House Site'];

export const COMPENSATION_RECORDS = PARCELS.map((p, idx) => ({
  id: `COMP-${String(idx + 1).padStart(4, '0')}`,
  parcelId: p.id,
  projectId: p.projectId,
  ownerName: p.ownerName,
  state: p.state,
  district: p.district,
  amountAssessed: p.compensationAmount,
  amountPaid: p.paymentStatus === 'Paid' ? p.compensationAmount
    : p.paymentStatus === 'Partially Paid' ? Math.round(p.compensationAmount * 0.5 * 100) / 100
    : 0,
  paymentStatus: p.paymentStatus,
  rrPackage: RR_PACKAGES[idx % RR_PACKAGES.length],
  disbursementDate: p.paymentStatus !== 'Pending' ? `2025-${String(1 + (idx % 12)).padStart(2, '0')}-${String(1 + (idx % 27)).padStart(2, '0')}` : null,
}));

export function compensationSummaryByState() {
  const map = {};
  COMPENSATION_RECORDS.forEach((r) => {
    if (!map[r.state]) map[r.state] = { state: r.state, assessed: 0, paid: 0 };
    map[r.state].assessed += r.amountAssessed;
    map[r.state].paid += r.amountPaid;
  });
  return Object.values(map).map((s) => ({
    ...s,
    assessed: Math.round(s.assessed),
    paid: Math.round(s.paid),
  }));
}

export const affectedFamiliesTotal = PROJECTS.reduce((sum, p) => sum + p.affectedFamilies, 0);
export const displacedFamiliesTotal = PROJECTS.reduce((sum, p) => sum + p.displacedFamilies, 0);
