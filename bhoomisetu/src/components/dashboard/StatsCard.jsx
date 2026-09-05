export default function StatsCard({ label, value, icon: Icon, color = 'navy', suffix }) {
  const colors = {
    navy: 'bg-navy-50 text-navy-600',
    green: 'bg-green-50 text-green-600',
    saffron: 'bg-saffron-50 text-saffron-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  };
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${colors[color]}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-gray-800 truncate">{value}{suffix && <span className="text-sm font-medium text-gray-400 ml-1">{suffix}</span>}</p>
        <p className="text-xs text-gray-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
