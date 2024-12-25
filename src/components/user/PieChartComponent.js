import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6666', '#66CCFF', '#FF99CC'];

function PieChartComponent() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API và chuyển đổi dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/books/category-distribution');
        const rawData = response.data;

        // Chuyển đổi dữ liệu từ object sang array
        const formattedData = Object.keys(rawData).map((key) => ({
          name: key,     // key là tên thể loại
          value: rawData[key], // value là số lượng sách
        }));

        setChartData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h2 style={{ textAlign: 'center' }}>Số lượng sách các thể loại lớn của thư viện</h2>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Đang tải dữ liệu...</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default PieChartComponent;
