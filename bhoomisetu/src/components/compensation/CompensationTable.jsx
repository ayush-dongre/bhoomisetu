import EmptyState from '../common/EmptyState';
import Badge from '../common/Badge';
import { formatLakh } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export default function CompensationTable({ records }) {
  if (records.length === 0) return <EmptyState title="No compensation records found" />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-100">
            <th className="py-2.5 pr-4 font-medium">Record ID</th>
            <th className="py-2.5 pr-4 font-medium">Owner</th>
            <th className="py-2.5 pr-4 font-medium">District</th>
            <th className="py-2.5 pr-4 font-medium">Assessed</th>
            <th className="py-2.5 pr-4 font-medium">Paid</th>
            <th className="py-2.5 pr-4 font-medium">R&R Package</th>
            <th className="py-2.5 pr-4 font-medium">Disbursed On</th>
            <th className="py-2.5 pr-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/70">
              <td className="py-3 pr-4 font-mono text-xs text-navy-600">{r.id}</td>
              <td className="py-3 pr-4 text-gray-700">{r.ownerName}</td>
              <td className="py-3 pr-4 text-gray-500">{r.district}, {r.state}</td>
              <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{formatLakh(r.amountAssessed)}</td>
              <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{formatLakh(r.amountPaid)}</td>
              <td className="py-3 pr-4 text-gray-500">{r.rrPackage}</td>
              <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">{formatDate(r.disbursementDate)}</td>
              <td className="py-3 pr-4"><Badge status={r.paymentStatus} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
