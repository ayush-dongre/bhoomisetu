import { FileBarChart, Download, Calendar } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

const REPORTS = [
  { name: 'Monthly Progress Report', desc: 'Status of all projects nationwide, updated monthly.' },
  { name: 'Compensation Summary', desc: 'State-wise and district-wise compensation disbursement summary.' },
  { name: 'R&R Compliance Report', desc: 'Rehabilitation and resettlement package compliance status.' },
  { name: 'Delay Analysis Report', desc: 'Top 10 delayed projects with root-cause breakdown.' },
  { name: 'Land Bank Availability Report', desc: 'Available government land bank inventory by state.' },
];

export default function Reports() {
  const { pushToast } = useApp();
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Executive MIS Reports</h1>
        <p className="text-sm text-gray-400">Pre-built reports, exportable to PDF, Excel, or CSV</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {REPORTS.map((r) => (
          <Card key={r.name}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-600 flex items-center justify-center shrink-0">
                <FileBarChart size={18} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{r.name}</p>
                <p className="text-xs text-gray-400 mt-1">{r.desc}</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" icon={Calendar} onClick={() => pushToast('Custom date range selector coming soon in this demo.', 'info')}>Date Range</Button>
                  <Button size="sm" icon={Download} onClick={() => pushToast(`${r.name} exported as PDF.`, 'success')}>Export</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Scheduled Reports">
        <p className="text-sm text-gray-500">Reports auto-generate on the 1st of every month and are emailed to registered stakeholders. Configure schedules from Settings → Notifications.</p>
      </Card>
    </div>
  );
}
