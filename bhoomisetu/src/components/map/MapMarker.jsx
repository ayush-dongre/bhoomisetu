import { getStatusStyle } from '../../utils/statusHelper';

export default function MapMarker({ project, x, y, onClick, selected }) {
  const style = getStatusStyle(project.status);
  const dotColor = { 'On Track': '#22c55e', 'At Risk': '#eab308', Delayed: '#ef4444', Completed: '#1e40d9' }[project.status];
  return (
    <button
      onClick={() => onClick(project)}
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow transition-transform hover:scale-125 ${selected ? 'ring-2 ring-navy-500 scale-125' : ''}`}
    >
      <span className="block w-3.5 h-3.5 rounded-full" style={{ backgroundColor: dotColor }} />
    </button>
  );
}
