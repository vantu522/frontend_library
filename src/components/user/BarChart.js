import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['Truyện cười', 'Tiểu thuyết', 'Giáo trình', 'Truyện dân gian', 'Văn học', 'Khoa học'],
    datasets: [
      {
        label: 'Số lượng sách',
        data: [1000, 600, 800, 600, 400, 400],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Biểu thống kê số lượng sách đã được mượn theo từng thể loại',
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

  return <Bar data={data} options={options} />;
};

export default BarChart;
