import { useState } from 'react';
import Card from '../components/common/Card';
import IndiaMap from '../components/map/IndiaMap';
import MapLegend from '../components/map/MapLegend';
import MapFilters from '../components/map/MapFilters';
import Badge from '../components/common/Badge';
import { PROJECTS } from '../data/projects';
import { formatCrore } from '../utils/formatCurrency';
import { Link } from 'react-router-dom';

export default function NationalMap() {
  const [layer, setLayer] = useState('Projects');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const counts = {
    'On Track': PROJECTS.filter((p) => p.status === 'On Track').length,
    'At Risk': PROJECTS.filter((p) => p.status === 'At Risk').length,
    'Delayed': PROJECTS.filter((p) => p.status === 'Delayed').length,
    'Completed': PROJECTS.filter((p) => p.status === 'Completed').length,
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-800">National Map Dashboard</h1>
        <p className="text-sm text-gray-400">Interactive view of all land acquisition projects across India</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <MapFilters layer={layer} setLayer={setLayer} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
        <MapLegend />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <Card noPadding className="p-4">
            <IndiaMap statusFilter={statusFilter} onSelect={setSelected} selectedId={selected?.id} />
            <p className="text-xs text-gray-400 mt-3 px-1">Stylized national map — click a marker to preview a project. Zoom to state/district level available via Projects → filter by state.</p>
          </Card>
        </div>
        <div className="space-y-4">
          <Card title="Status Counts">
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(counts).map(([status, count]) => (
                <div key={status} className="p-3 rounded-lg bg-gray-50">
                  <Badge status={status} />
                  <p className="text-xl font-bold text-gray-800 mt-2">{count}</p>
                </div>
              ))}
            </div>
          </Card>
          {selected && (
            <Card title="Selected Project">
              <p className="font-medium text-gray-800 text-sm">{selected.name}</p>
              <p className="text-xs text-gray-400 mt-1">{selected.district}, {selected.state}</p>
              <div className="flex items-center justify-between mt-3 text-sm">
                <Badge status={selected.status} />
                <span className="text-gray-600">{formatCrore(selected.estimatedCost)}</span>
              </div>
              <Link to={`/projects/${selected.id}`} className="block text-center text-xs text-navy-600 hover:underline mt-3">View full details →</Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
