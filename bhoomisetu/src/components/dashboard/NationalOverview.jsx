import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import Card from '../common/Card';
import { getMonthlyTrend } from '../../data/dashboard';

export default function NationalOverview() {
  const data = getMonthlyTrend();
  return (
    <Card title="Monthly Acquisition Progress Trend" className="col-span-full">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Legend />
          <Line type="monotone" dataKey="progress" name="This Year" stroke="#1e40d9" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="lastYear" name="Last Year" stroke="#ff891f" strokeWidth={2} strokeDasharray="5 4" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
