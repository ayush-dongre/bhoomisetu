import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import Badge from '../common/Badge';
import { getStatusStyle } from '../../utils/statusHelper';

export default function AlertCard({ alert, onMarkRead }) {
  const style = getStatusStyle(alert.priority);
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${alert.read ? 'bg-white border-gray-100' : 'bg-navy-50/40 border-navy-100'}`}>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}>
        <AlertTriangle size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-medium text-gray-800">{alert.title}</p>
          <Badge status={alert.priority} />
        </div>
        <p className="text-sm text-gray-500 mt-1">{alert.message}</p>
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
          <span>{alert.createdAt}</span>
          <Link to={`/projects/${alert.projectId}`} className="text-navy-600 hover:underline">View project</Link>
        </div>
      </div>
      {!alert.read && (
        <button onClick={() => onMarkRead(alert.id)} className="text-gray-300 hover:text-green-600 shrink-0" title="Mark as read">
          <CheckCircle2 size={18} />
        </button>
      )}
    </div>
  );
}
