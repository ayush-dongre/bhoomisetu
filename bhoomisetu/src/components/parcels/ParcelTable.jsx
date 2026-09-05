import EmptyState from '../common/EmptyState';
import Badge from '../common/Badge';
import { formatLakh } from '../../utils/formatCurrency';

export default function ParcelTable({ parcels, onSelect }) {
  if (parcels.length === 0) return <EmptyState title="No parcels found" />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-100">
            <th className="py-2.5 pr-4 font-medium">Parcel ID</th>
            <th className="py-2.5 pr-4 font-medium">Survey No.</th>
            <th className="py-2.5 pr-4 font-medium">Owner</th>
            <th className="py-2.5 pr-4 font-medium">Land Type</th>
            <th className="py-2.5 pr-4 font-medium">Area (Ha)</th>
            <th className="py-2.5 pr-4 font-medium">Compensation</th>
            <th className="py-2.5 pr-4 font-medium">Payment</th>
            <th className="py-2.5 pr-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((p) => (
            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/70 cursor-pointer" onClick={() => onSelect(p)}>
              <td className="py-3 pr-4 font-mono text-xs text-navy-600">{p.id}</td>
              <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{p.surveyNumber}</td>
              <td className="py-3 pr-4 text-gray-700">{p.ownerName}</td>
              <td className="py-3 pr-4 text-gray-500">{p.landType}</td>
              <td className="py-3 pr-4 text-gray-600">{p.area}</td>
              <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{formatLakh(p.compensationAmount)}</td>
              <td className="py-3 pr-4"><Badge status={p.paymentStatus} /></td>
              <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">{p.acquisitionStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
