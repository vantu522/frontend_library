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
  { name: 'Tháng 1', borrowed: 100, returned: 80 },
  { name: 'Tháng 2', borrowed: 120, returned: 100 },
  { name: 'Tháng 3', borrowed: 150, returned: 130 },
  { name: 'Tháng 4', borrowed: 180, returned: 160 },
  { name: 'Tháng 5', borrowed: 200, returned: 190 },
  { name: 'Tháng 6', borrowed: 250, returned: 220 },
  { name: 'Tháng 7', borrowed: 300, returned: 270 },
];

function LineChartComponent() {
  return (
    <div>
      <h3>Biểu đồ số lượng sách mượn và trả lại theo tháng</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="borrowed" stroke="#8884d8" name="Sách mượn" />
          <Line type="monotone" dataKey="returned" stroke="#82ca9d" name="Sách trả lại" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;
