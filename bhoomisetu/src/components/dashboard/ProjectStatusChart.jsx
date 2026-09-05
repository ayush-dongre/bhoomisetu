import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStatusDistribution } from '../../data/dashboard';
import Card from '../common/Card';

export default function ProjectStatusChart() {
  const data = getStatusDistribution();
  return (
    <Card title="Project Status Distribution">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
            {data.map((d) => <Cell key={d.name} fill={d.color} />)}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={30} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
