import Card from '../components/common/Card';
import Pagination from '../components/common/Pagination';
import CompensationFilters from '../components/compensation/CompensationFilters';
import CompensationTable from '../components/compensation/CompensationTable';
import CompensationChart from '../components/compensation/CompensationChart';
import StatsCard from '../components/dashboard/StatsCard';
import { IndianRupee, CheckCircle2, Clock } from 'lucide-react';
import { useFilters } from '../hooks/useFilters';
import { COMPENSATION_RECORDS } from '../data/compensation';
import { formatLakh } from '../utils/formatCurrency';

export default function Compensation() {
  const { search, setSearch, filters, setFilter, paginated, page, setPage, totalPages, total } =
    useFilters(COMPENSATION_RECORDS, { searchKeys: ['id', 'ownerName', 'parcelId'], pageSize: 10 });

  const totalAssessed = COMPENSATION_RECORDS.reduce((s, r) => s + r.amountAssessed, 0);
  const totalPaid = COMPENSATION_RECORDS.reduce((s, r) => s + r.amountPaid, 0);
  const pendingCount = COMPENSATION_RECORDS.filter((r) => r.paymentStatus === 'Pending').length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Compensation & R&R</h1>
        <p className="text-sm text-gray-400">Track compensation disbursement and rehabilitation packages</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatsCard label="Total Assessed" value={formatLakh(Math.round(totalAssessed))} icon={IndianRupee} color="navy" />
        <StatsCard label="Total Disbursed" value={formatLakh(Math.round(totalPaid))} icon={CheckCircle2} color="green" />
        <StatsCard label="Payments Pending" value={pendingCount} icon={Clock} color="yellow" />
      </div>

      <CompensationChart />

      <Card>
        <CompensationFilters
          search={search} setSearch={setSearch}
          status={filters.paymentStatus || 'All'} setStatus={(v) => setFilter('paymentStatus', v)}
        />
        <CompensationTable records={paginated} />
        <Pagination page={page} totalPages={totalPages} onChange={setPage} total={total} />
      </Card>
    </div>
  );
}
