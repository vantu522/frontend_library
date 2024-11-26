import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Tháng 1', uv: 4000, pv: 2400 },
  { name: 'Tháng 2', uv: 3000, pv: 1398 },
  { name: 'Tháng 3', uv: 2000, pv: 9800 },
  { name: 'Tháng 4', uv: 2780, pv: 3908 },
  { name: 'Tháng 5', uv: 1890, pv: 4800 },
  { name: 'Tháng 6', uv: 2390, pv: 3800 },
  { name: 'Tháng 7', uv: 3490, pv: 4300 },
];

function LineChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;
