import { FolderKanban, LandPlot, IndianRupee, Users, TrendingUp } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import NationalOverview from '../components/dashboard/NationalOverview';
import ProjectStatusChart from '../components/dashboard/ProjectStatusChart';
import StateProgressChart from '../components/dashboard/StateProgressChart';
import CompensationSummary from '../components/dashboard/CompensationSummary';
import RecentProjects from '../components/dashboard/RecentProjects';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import { getNationalOverview } from '../data/dashboard';
import { formatCrore, formatNumber } from '../utils/formatCurrency';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const overview = getNationalOverview();
  const { user } = useAuth();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Welcome back, {user?.name?.split(' ')[0] || 'Officer'}</h1>
        <p className="text-sm text-gray-400">{user?.role} · National Land Acquisition Overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Projects" value={formatNumber(overview.totalProjects)} icon={FolderKanban} color="navy" />
        <StatsCard label="Land Acquired (Ha)" value={formatNumber(overview.totalLandAcquired)} suffix={`/ ${formatNumber(overview.totalLandRequired)}`} icon={LandPlot} color="saffron" />
        <StatsCard label="Compensation Disbursed" value={formatCrore(overview.totalPaid)} icon={IndianRupee} color="green" />
        <StatsCard label="Affected Families" value={formatNumber(overview.affectedFamilies)} icon={Users} color="yellow" />
      </div>

      <NationalOverview />

      <div className="grid lg:grid-cols-2 gap-5">
        <ProjectStatusChart />
        <StateProgressChart />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2"><RecentProjects /></div>
        <div className="space-y-5">
          <CompensationSummary overview={overview} />
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
}
