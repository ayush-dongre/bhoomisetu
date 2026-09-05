import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, IndianRupee, Calendar, AlertTriangle, Download } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProjectProgress from '../components/projects/ProjectProgress';
import ProjectTimeline from '../components/projects/ProjectTimeline';
import { getProjectById } from '../data/projects';
import { getParcelsByProject } from '../data/parcels';
import { DOCUMENTS } from '../data/documents';
import { formatCrore, formatNumber } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import { riskLabel } from '../utils/statusHelper';
import EmptyState from '../components/common/EmptyState';
import { useApp } from '../context/AppContext';

export default function ProjectDetails() {
  const { id } = useParams();
  const project = getProjectById(id);
  const { pushToast } = useApp();

  if (!project) {
    return <EmptyState title="Project not found" message={`No project exists with ID ${id}.`} />;
  }

  const parcels = getParcelsByProject(project.id);
  const documents = DOCUMENTS.filter((d) => d.projectId === project.id);

  return (
    <div className="space-y-5">
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-600">
        <ArrowLeft size={15} /> Back to Projects
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold text-gray-800">{project.name}</h1>
            <Badge status={project.status} />
          </div>
          <p className="text-sm text-gray-400 mt-1">{project.id} · {project.department} · {project.district}, {project.state}</p>
        </div>
        <Button variant="outline" icon={Download} onClick={() => pushToast('Report export queued (PDF).', 'info')}>Export Report</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-xs text-gray-400 flex items-center gap-1.5"><MapPin size={13} /> Land Progress</p>
          <p className="text-lg font-bold text-gray-800 mt-1">{project.landAcquired} / {project.landRequired} Ha</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-400 flex items-center gap-1.5"><IndianRupee size={13} /> Estimated Cost</p>
          <p className="text-lg font-bold text-gray-800 mt-1">{formatCrore(project.estimatedCost)}</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-400 flex items-center gap-1.5"><Users size={13} /> Affected Families</p>
          <p className="text-lg font-bold text-gray-800 mt-1">{formatNumber(project.affectedFamilies)}</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-400 flex items-center gap-1.5"><AlertTriangle size={13} /> Risk Score</p>
          <p className="text-lg font-bold text-gray-800 mt-1">{project.riskScore}/10 · {riskLabel(project.riskScore)}</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Card title="Overall Progress">
            <ProjectProgress percent={project.progress} />
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div><p className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={12} /> Start Date</p><p className="font-medium text-gray-700">{formatDate(project.startDate)}</p></div>
              <div><p className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={12} /> Target End Date</p><p className="font-medium text-gray-700">{formatDate(project.endDate)}</p></div>
            </div>
            {project.delayReason && (
              <div className="mt-4 bg-red-50 text-red-700 text-sm rounded-lg px-3 py-2.5 flex items-center gap-2">
                <AlertTriangle size={15} /> Delayed by {project.delayDays} days — {project.delayReason}
              </div>
            )}
          </Card>

          <Card title={`Land Parcels (${parcels.length})`}>
            {parcels.length === 0 ? <p className="text-sm text-gray-400">No parcels linked yet.</p> : (
              <div className="space-y-2">
                {parcels.slice(0, 6).map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-700">{p.id} · {p.surveyNumber}</span>
                    <Badge status={p.acquisitionStatus === 'Possession Taken' ? 'Completed' : p.paymentStatus} label={p.acquisitionStatus} />
                  </div>
                ))}
                {parcels.length > 6 && <Link to="/parcels" className="text-xs text-navy-600 hover:underline">View all {parcels.length} parcels →</Link>}
              </div>
            )}
          </Card>

          <Card title={`Linked Documents (${documents.length})`}>
            {documents.length === 0 ? <p className="text-sm text-gray-400">No documents uploaded yet.</p> : (
              <div className="space-y-2">
                {documents.slice(0, 5).map((d) => (
                  <div key={d.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-700 truncate">{d.name}</span>
                    <Badge status={d.status} />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div>
          <Card title="Acquisition Lifecycle">
            <ProjectTimeline stageIndex={project.stageIndex} />
          </Card>
        </div>
      </div>
    </div>
  );
}
