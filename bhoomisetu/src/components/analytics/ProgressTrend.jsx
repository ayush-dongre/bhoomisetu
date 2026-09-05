import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Card from '../common/Card';
import { getMonthlyTrend } from '../../data/dashboard';

export default function ProgressTrend() {
  const data = getMonthlyTrend();
  return (
    <Card title="Cumulative Progress Trend (This Year)">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Area type="monotone" dataKey="progress" stroke="#1e40d9" fill="#dbe4ff" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
