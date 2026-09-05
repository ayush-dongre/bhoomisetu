import Card from '../components/common/Card';
import StateAnalytics from '../components/analytics/StateAnalytics';
import ProgressTrend from '../components/analytics/ProgressTrend';
import ApprovalTimeChart from '../components/analytics/ApprovalTimeChart';
import StatusDistribution from '../components/analytics/StatusDistribution';
import { PROJECTS } from '../data/projects';
import { riskLabel } from '../utils/statusHelper';
import Badge from '../components/common/Badge';
import { formatCrore } from '../utils/formatCurrency';

export default function Analytics() {
  const highRisk = [...PROJECTS].sort((a, b) => b.riskScore - a.riskScore).slice(0, 8);
  const avgRatePerHa = Math.round(PROJECTS.reduce((s, p) => s + p.estimatedCost / p.landRequired, 0) / PROJECTS.length * 100) / 100;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Analytics & Predictive Insights</h1>
        <p className="text-sm text-gray-400">Trends, rankings, and AI-assisted risk scoring across all projects</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <ProgressTrend />
        <StatusDistribution />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <StateAnalytics />
        <ApprovalTimeChart />
      </div>

      <Card title="Predictive Risk Ranking (Top 8 Highest-Risk Projects)">
        <p className="text-xs text-gray-400 mb-3">Rule-based risk model: delay severity, approval bottlenecks, and land-acquisition velocity. Avg. cost/Ha across all projects: {formatCrore(avgRatePerHa)}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="py-2 pr-4 font-medium">Project</th>
                <th className="py-2 pr-4 font-medium">State</th>
                <th className="py-2 pr-4 font-medium">Delay (days)</th>
                <th className="py-2 pr-4 font-medium">Risk Score</th>
                <th className="py-2 pr-4 font-medium">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {highRisk.map((p) => (
                <tr key={p.id} className="border-b border-gray-50">
                  <td className="py-2.5 pr-4 text-gray-800 max-w-[220px] truncate">{p.name}</td>
                  <td className="py-2.5 pr-4 text-gray-500">{p.state}</td>
                  <td className="py-2.5 pr-4 text-gray-500">{p.delayDays}</td>
                  <td className="py-2.5 pr-4 text-gray-700 font-medium">{p.riskScore}/10</td>
                  <td className="py-2.5 pr-4"><Badge status={p.riskScore >= 7 ? 'Delayed' : p.riskScore >= 4 ? 'At Risk' : 'On Track'} label={riskLabel(p.riskScore)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
