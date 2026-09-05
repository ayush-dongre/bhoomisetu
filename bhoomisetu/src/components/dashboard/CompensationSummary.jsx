import { formatCrore } from '../../utils/formatCurrency';
import Card from '../common/Card';

export default function CompensationSummary({ overview }) {
  const pct = overview.totalCompensation ? Math.round((overview.totalPaid / overview.totalCompensation) * 100) : 0;
  return (
    <Card title="Compensation Disbursement">
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-2xl font-bold text-gray-800">{formatCrore(overview.totalPaid)}</p>
          <p className="text-xs text-gray-400">of {formatCrore(overview.totalCompensation)} assessed</p>
        </div>
        <span className="text-lg font-semibold text-navy-600">{pct}%</span>
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-navy-600 to-saffron-600 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-gray-400 mt-3">{overview.affectedFamilies.toLocaleString('en-IN')} families affected nationwide</p>
    </Card>
  );
}
