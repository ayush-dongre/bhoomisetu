import Card from '../components/common/Card';
import Button from '../components/common/Button';
import AlertFilters from '../components/alerts/AlertFilters';
import AlertCard from '../components/alerts/AlertCard';
import { useFilters } from '../hooks/useFilters';
import { useApp } from '../context/AppContext';
import { ESCALATIONS } from '../data/alerts';
import Badge from '../components/common/Badge';

export default function Alerts() {
  const { alerts, markAlertRead, markAllRead } = useApp();
  const { search, setSearch, filters, setFilter, paginated, total } =
    useFilters(alerts, { searchKeys: ['title', 'message'], pageSize: 100 });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Alerts & Escalations</h1>
          <p className="text-sm text-gray-400">{total} alerts matching your filters</p>
        </div>
        <Button variant="outline" onClick={markAllRead}>Mark all as read</Button>
      </div>

      <Card>
        <AlertFilters
          search={search} setSearch={setSearch}
          priority={filters.priority || 'All'} setPriority={(v) => setFilter('priority', v)}
          type={filters.type || 'All'} setType={(v) => setFilter('type', v)}
        />
        <div className="space-y-2">
          {paginated.map((a) => <AlertCard key={a.id} alert={a} onMarkRead={markAlertRead} />)}
        </div>
      </Card>

      <Card title="Escalation Matrix" >
        <p className="text-xs text-gray-400 mb-3">Auto-escalated projects based on SLA breach thresholds (7 / 14 / 30 days)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="py-2 pr-4 font-medium">Project</th>
                <th className="py-2 pr-4 font-medium">Level</th>
                <th className="py-2 pr-4 font-medium">Escalated From</th>
                <th className="py-2 pr-4 font-medium">Escalated To</th>
                <th className="py-2 pr-4 font-medium">Reason</th>
                <th className="py-2 pr-4 font-medium">Days Overdue</th>
              </tr>
            </thead>
            <tbody>
              {ESCALATIONS.map((e) => (
                <tr key={e.id} className="border-b border-gray-50">
                  <td className="py-2.5 pr-4 font-mono text-xs text-navy-600">{e.projectId}</td>
                  <td className="py-2.5 pr-4"><Badge status={e.level === 3 ? 'Delayed' : e.level === 2 ? 'At Risk' : 'Pending'} label={`Level ${e.level}`} /></td>
                  <td className="py-2.5 pr-4 text-gray-500">{e.from}</td>
                  <td className="py-2.5 pr-4 text-gray-500">{e.to}</td>
                  <td className="py-2.5 pr-4 text-gray-500">{e.reason}</td>
                  <td className="py-2.5 pr-4 text-gray-700 font-medium">{e.daysOverdue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
