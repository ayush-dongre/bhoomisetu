import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import Card from '../common/Card';
import { PROJECTS, DELAY_REASONS_LIST } from '../../data/projects';

export default function ApprovalTimeChart() {
  const data = DELAY_REASONS_LIST.map((reason) => ({
    reason,
    count: PROJECTS.filter((p) => p.delayReason === reason).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <Card title="Delay Root Causes (Top Delayed Projects)">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
          <YAxis dataKey="reason" type="category" width={160} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="count" radius={[0, 6, 6, 0]}>
            {data.map((d, i) => <Cell key={d.reason} fill={['#ef4444', '#f97316', '#eab308', '#84cc16', '#06b6d4', '#8b5cf6'][i % 6]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
