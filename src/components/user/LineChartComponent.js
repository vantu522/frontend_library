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
          'https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/transactions/weekly-stats'
        );

        const apiData = response.data;

        // Sử dụng trực tiếp dữ liệu từ API
        const formattedData = apiData.map((item) => ({
          day: item.day, // Lấy trực tiếp ngày trong tuần từ API
          borrow: item.borrowed || 0, // Số lượng sách mượn
          return: item.returned || 0, // Số lượng sách trả
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
        Biểu đồ số lượng sách mượn và trả lại theo ngày trong tuần
      </h3>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Đang tải dữ liệu...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" /> {/* Hiển thị ngày trong tuần trên trục X */}
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
