import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Card from '../common/Card';
import { useApp } from '../../context/AppContext';
import { getStatusStyle } from '../../utils/statusHelper';

export default function AlertsPanel() {
  const { alerts } = useApp();
  const top = alerts.filter((a) => a.actionRequired).slice(0, 5);
  return (
    <Card title="Priority Alerts" action={<Link to="/alerts" className="text-xs text-navy-600 hover:underline">View all</Link>}>
      {top.length === 0 && <p className="text-sm text-gray-400">No urgent alerts right now.</p>}
      <div className="space-y-2">
        {top.map((a) => {
          const style = getStatusStyle(a.priority);
          return (
            <div key={a.id} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50">
              <AlertTriangle size={15} className={`mt-0.5 shrink-0 ${style.text}`} />
              <div className="min-w-0">
                <p className="text-sm text-gray-700 leading-snug truncate">{a.title}</p>
                <p className="text-xs text-gray-400">{a.createdAt}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
