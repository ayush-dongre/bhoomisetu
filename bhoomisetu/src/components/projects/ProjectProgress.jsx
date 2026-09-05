export default function ProjectProgress({ percent, size = 'md' }) {
  const color = percent >= 80 ? 'bg-green-500' : percent >= 40 ? 'bg-yellow-500' : 'bg-red-400';
  const height = size === 'sm' ? 'h-1.5' : 'h-2';
  return (
    <div className="flex items-center gap-2 w-full">
      <div className={`flex-1 ${height} bg-gray-100 rounded-full overflow-hidden`}>
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${percent}%` }} />
      </div>
      <span className="text-xs font-medium text-gray-500 w-9 text-right">{percent}%</span>
    </div>
  );
}
