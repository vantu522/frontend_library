import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Sách Khoa Học', value: 400 },
  { name: 'Tiểu Thuyết', value: 300 },
  { name: 'Văn Học Thiếu Nhi', value: 300 },
  { name: 'Sách Nghiên Cứu', value: 200 },
];

function PieChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#3366CC"
          dataKey="value"
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartComponent;
