import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { getStatusDistribution } from '../../data/dashboard';

export default function StatusDistribution() {
  const data = getStatusDistribution();
  return (
    <Card title="National Status Distribution">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={95} label={(d) => `${d.name} (${d.value})`}>
            {data.map((d) => <Cell key={d.name} fill={d.color} />)}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
