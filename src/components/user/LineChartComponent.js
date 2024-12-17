import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

function LineChartComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://library-mana.azurewebsites.net/transactions/statistics'
        );

        const apiData = response.data;

        // Chuyển đổi dữ liệu API thành định dạng recharts
        const formattedData = Object.keys(apiData).map((key) => ({
          month: `Tháng ${key}`, 
          borrow: apiData[key]?.borrow || 0,
          return: apiData[key]?.return || 0,
        }));

        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching API:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>
        Biểu đồ số lượng sách mượn và trả lại theo tháng
      </h3>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Đang tải dữ liệu...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="borrow"
              stroke="#8884d8"
              name="Sách mượn"
            />
            <Line
              type="monotone"
              dataKey="return"
              stroke="#82ca9d"
              name="Sách trả lại"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default LineChartComponent;
