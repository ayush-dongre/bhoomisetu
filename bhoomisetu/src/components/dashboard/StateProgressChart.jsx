import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getStateProgress } from '../../data/dashboard';
import Card from '../common/Card';

export default function StateProgressChart() {
  const data = getStateProgress();
  return (
    <Card title="State-wise Average Progress">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <YAxis dataKey="state" type="category" width={100} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar dataKey="avgProgress" fill="#1e40d9" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
