import { PARCEL_STATUS_COLORS } from '../../data/parcels';

export default function MapLegend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600">
      {Object.entries(PARCEL_STATUS_COLORS).map(([label, color]) => (
        <span key={label} className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="h-3 w-3 rounded-sm border border-black/10" style={{ backgroundColor: color }} />
          {label}
        </span>
      ))}
    </div>
  );
}
