const ITEMS = [
  { label: 'On Track', color: '#22c55e' },
  { label: 'At Risk', color: '#eab308' },
  { label: 'Delayed', color: '#ef4444' },
  { label: 'Completed', color: '#1e40d9' },
];

export default function MapLegend() {
  return (
    <div className="flex flex-wrap gap-4 bg-white rounded-lg border border-gray-100 px-4 py-2.5 text-xs text-gray-600">
      {ITEMS.map((i) => (
        <span key={i.label} className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  );
}
