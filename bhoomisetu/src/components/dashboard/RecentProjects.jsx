import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { PROJECTS } from '../../data/projects';

export default function RecentProjects() {
  const recent = [...PROJECTS].sort((a, b) => (a.startDate < b.startDate ? 1 : -1)).slice(0, 6);
  return (
    <Card title="Recent Projects" action={<Link to="/projects" className="text-xs text-navy-600 hover:underline">View all</Link>}>
      <div className="space-y-1 -mx-2">
        {recent.map((p) => (
          <Link key={p.id} to={`/projects/${p.id}`} className="flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-gray-50">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
              <p className="text-xs text-gray-400">{p.id} · {p.district}, {p.state}</p>
            </div>
            <Badge status={p.status} />
          </Link>
        ))}
      </div>
    </Card>
  );
}
