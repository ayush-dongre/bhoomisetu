import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import Card from '../common/Card';
import { compensationSummaryByState } from '../../data/compensation';

export default function CompensationChart() {
  const data = compensationSummaryByState().sort((a, b) => b.assessed - a.assessed);
  return (
    <Card title="Compensation: Assessed vs Paid (₹ Lakh, by State)">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="state" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="assessed" name="Assessed" fill="#93a5f0" radius={[4, 4, 0, 0]} />
          <Bar dataKey="paid" name="Paid" fill="#1e40d9" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
