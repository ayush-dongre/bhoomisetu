import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Card from '../common/Card';
import { getStateProgress } from '../../data/dashboard';

export default function StateAnalytics() {
  const data = getStateProgress().sort((a, b) => b.projects - a.projects);
  return (
    <Card title="Projects per State (Ranked)">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="code" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip labelFormatter={(l, p) => p?.[0]?.payload?.state} />
          <Bar dataKey="projects" fill="#ff891f" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
