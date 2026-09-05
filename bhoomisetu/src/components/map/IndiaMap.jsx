import { useMemo, useState } from 'react';
import MapMarker from './MapMarker';
import { PROJECTS } from '../../data/projects';

const STATE_POSITIONS = {
  MH: { x: 34, y: 56 }, UP: { x: 50, y: 30 }, GJ: { x: 22, y: 44 },
  RJ: { x: 30, y: 28 }, TN: { x: 45, y: 86 }, KA: { x: 37, y: 73 },
  WB: { x: 68, y: 45 }, MP: { x: 44, y: 47 }, BR: { x: 60, y: 34 },
  OD: { x: 59, y: 58 },
};

function hashJitter(str, range = 6) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 1000;
  return (h / 1000 - 0.5) * range;
}

export default function IndiaMap({ statusFilter = 'All', onSelect, selectedId }) {
  const [hovered, setHovered] = useState(null);

  const markers = useMemo(() => {
    return PROJECTS
      .filter((p) => statusFilter === 'All' || p.status === statusFilter)
      .map((p) => {
        const base = STATE_POSITIONS[p.stateCode] || { x: 50, y: 50 };
        return {
          project: p,
          x: base.x + hashJitter(p.id + 'x'),
          y: base.y + hashJitter(p.id + 'y'),
        };
      });
  }, [statusFilter]);

  const active = hovered || (selectedId && PROJECTS.find((p) => p.id === selectedId));

  return (
    <div className="relative w-full aspect-[4/5] max-h-[520px] bg-gradient-to-b from-navy-50 to-white rounded-xl border border-gray-100 overflow-hidden">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-40">
        <path d="M45,5 L65,12 L72,25 L68,32 L75,40 L70,50 L65,60 L60,75 L55,88 L48,92 L42,85 L38,78 L35,65 L28,58 L20,50 L18,38 L25,28 L30,15 Z" fill="none" stroke="#1e40d9" strokeWidth="0.6" />
      </svg>
      {markers.map((m, i) => (
        <div key={m.project.id} onMouseEnter={() => setHovered(m.project)} onMouseLeave={() => setHovered(null)}>
          <MapMarker project={m.project} x={m.x} y={m.y} onClick={onSelect} selected={selectedId === m.project.id} />
        </div>
      ))}
      {active && (
        <div className="absolute bottom-3 left-3 right-3 bg-white rounded-lg shadow-lg border border-gray-100 p-3 text-sm animate-fade-in">
          <p className="font-medium text-gray-800 line-clamp-1">{active.name}</p>
          <p className="text-xs text-gray-400">{active.id} · {active.district}, {active.state} · {active.progress}% complete</p>
        </div>
      )}
    </div>
  );
}
