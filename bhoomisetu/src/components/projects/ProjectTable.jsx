import { Link } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import Badge from '../common/Badge';
import ProjectProgress from './ProjectProgress';
import EmptyState from '../common/EmptyState';
import { formatCrore } from '../../utils/formatCurrency';

const COLUMNS = [
  { key: 'id', label: 'Project ID' },
  { key: 'name', label: 'Name' },
  { key: 'state', label: 'State' },
  { key: 'department', label: 'Department' },
  { key: 'progress', label: 'Progress' },
  { key: 'estimatedCost', label: 'Cost' },
  { key: 'status', label: 'Status' },
];

export default function ProjectTable({ projects, sortKey, sortDir, toggleSort }) {
  if (projects.length === 0) return <EmptyState title="No projects found" message="Try clearing filters or search terms." />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-100">
            {COLUMNS.map((c) => (
              <th key={c.key} className="py-2.5 pr-4 font-medium whitespace-nowrap">
                <button onClick={() => toggleSort(c.key)} className="flex items-center gap-1 hover:text-gray-600">
                  {c.label}
                  {sortKey === c.key && <ArrowUpDown size={12} />}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/70">
              <td className="py-3 pr-4 font-mono text-xs text-gray-500 whitespace-nowrap">
                <Link to={`/projects/${p.id}`} className="text-navy-600 hover:underline">{p.id}</Link>
              </td>
              <td className="py-3 pr-4 max-w-[220px]">
                <Link to={`/projects/${p.id}`} className="text-gray-800 font-medium hover:text-navy-600 line-clamp-1">{p.name}</Link>
              </td>
              <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{p.state}</td>
              <td className="py-3 pr-4 text-gray-500 max-w-[180px] truncate">{p.department}</td>
              <td className="py-3 pr-4 min-w-[140px]"><ProjectProgress percent={p.progress} size="sm" /></td>
              <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{formatCrore(p.estimatedCost)}</td>
              <td className="py-3 pr-4"><Badge status={p.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
