import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [loading, setLoading] = useState(true);

  // Hàm tự động sinh màu ngẫu nhiên
  const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/books/category-distribution'
        );

        const apiData = response.data;

        // Chuyển đổi dữ liệu API thành labels và values
        const labels = Object.keys(apiData); // Tên thể loại
        const values = Object.values(apiData); // Số lượng sách

        // Tạo màu sắc ngẫu nhiên cho mỗi thể loại
        const backgroundColors = generateRandomColors(labels.length);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Số lượng sách',
              data: values,
              backgroundColor: backgroundColors, // Màu nền ngẫu nhiên
              borderColor: backgroundColors.map((color) =>
                color.replace('0.6', '1')
              ), // Đổi opacity để đường viền rõ hơn
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê số lượng sách theo từng thể loại',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const genre = context.label; // Lấy nhãn từ labels
            const value = context.raw;  // Lấy giá trị tương ứng
            return `${genre}: ${value} sách`;
          },
        },
      },
    },
  };

  return (
    <div>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Đang tải dữ liệu...</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default BarChart;
