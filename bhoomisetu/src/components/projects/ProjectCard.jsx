import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import ProjectProgress from './ProjectProgress';
import { formatCrore } from '../../utils/formatCurrency';

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.id}`} className="block bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="font-medium text-gray-800 text-sm line-clamp-2">{project.name}</p>
        <Badge status={project.status} />
      </div>
      <p className="text-xs text-gray-400 mb-3">{project.id} · {project.district}, {project.state}</p>
      <ProjectProgress percent={project.progress} size="sm" />
      <div className="flex justify-between text-xs text-gray-400 mt-3">
        <span>{formatCrore(project.estimatedCost)}</span>
        <span>{project.affectedFamilies.toLocaleString('en-IN')} families</span>
      </div>
    </Link>
  );
}
