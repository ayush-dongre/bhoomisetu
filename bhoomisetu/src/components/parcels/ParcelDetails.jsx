import Badge from '../common/Badge';
import { formatLakh } from '../../utils/formatCurrency';
import { MapPin, Satellite } from 'lucide-react';

export default function ParcelDetails({ parcel }) {
  if (!parcel) return null;
  const rows = [
    ['Survey Number', parcel.surveyNumber],
    ['Khasra Number', parcel.khasraNumber],
    ['Khatauni Number', parcel.khatauniNumber],
    ['Land Type', parcel.landType],
    ['Owner', `${parcel.ownerName} (${parcel.ownerType})`],
    ['Area', `${parcel.area} Ha`],
    ['Location', `${parcel.district}, ${parcel.state}`],
    ['Compensation', formatLakh(parcel.compensationAmount)],
    ['Project', parcel.projectId],
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
        <MapPin size={14} /> {parcel.lat.toFixed(4)}, {parcel.lng.toFixed(4)}
        <span className="ml-auto flex items-center gap-1 text-xs"><Satellite size={12} /> Bhulekh verified (mock)</span>
      </div>
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
        {rows.map(([label, value]) => (
          <div key={label}>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-gray-800 font-medium">{value}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Badge status={parcel.paymentStatus} label={`Payment: ${parcel.paymentStatus}`} />
        <Badge status="On Track" label={parcel.acquisitionStatus} />
      </div>
    </div>
  );
}
