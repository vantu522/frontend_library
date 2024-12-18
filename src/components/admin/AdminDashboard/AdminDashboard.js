import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { FaBook, FaBookOpen, FaUsers, FaUserCheck } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import DonutChart from '../DonutChart ';

// Đăng ký các thành phần Chart.js
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement
);

const AdminDashboard = () => {
  // State quản lý các thống kê dashboard
  const [dashboardStats, setDashboardStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    totalUsers: 0,
    returnedBooks: 0
  });

  // State cho các biểu đồ
  const [weeklyStats, setWeeklyStats] = useState({
    labels: [],
    datasets: [
      {
        label: 'Mượn',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Trả',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
      }
    ]
  });

  const [monthlyStats, setMonthlyStats] = useState({
    labels: [],
    datasets: [
      {
        label: 'Mượn',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Trả',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
      }
    ]
  });

  const [bookCategoryStats, setBookCategoryStats] = useState({
    labels: [],
    datasets: [
      {
        label: 'Số Lượng Sách',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ]
      }
    ]
  });

  // Fetch dữ liệu thống kê dashboard
  const fetchDashboardStats = async () => {
    try {
      const [totalBooks, borrowedBooks, totalUsers, returnedBooks] = await Promise.all([
        axios.get('https://library-mana.azurewebsites.net/books/total').then(res => {
          console.log('Total Books Response:', res.data);
          return res.data;
        }),
        axios.get('https://library-mana.azurewebsites.net/transactions/count-borrowed').then(res => {
          console.log('Borrowed Books Response:', res.data);
          return res.data;
        }),
        axios.get('https://library-mana.azurewebsites.net/members/count').then(res => {
          console.log('Total Users Response:', res.data);
          return res.data;
        }),
        axios.get('https://library-mana.azurewebsites.net/books/count-returned').then(res => {
          console.log('Returned Books Response:', res.data);
          return res.data;
        })
      ]);

      // Validate and set stats, use default if invalid
      setDashboardStats({
        totalBooks: typeof totalBooks === 'number' ? totalBooks : 500,
        borrowedBooks: typeof borrowedBooks === 'number' ? borrowedBooks : 150,
        totalUsers: typeof totalUsers === 'number' ? totalUsers : 1234,
        returnedBooks: typeof returnedBooks === 'number' ? returnedBooks : 456
      });
    } catch (error) {
      console.error('Lỗi tải thống kê dashboard:', error);
      // Set default values if all API calls fail
      setDashboardStats({
        totalBooks: 500,
        borrowedBooks: 150,
        totalUsers: 1234,
        returnedBooks: 456
      });
    }
  };

  // Fetch dữ liệu biểu đồ
  const fetchChartStats = async () => {
    try {
      // Biểu đồ tuần
      const weeklyResponse = await axios.get('http://127.0.0.1:5000/api/data');
      const weeklyData = weeklyResponse.data;

      setWeeklyStats({
        labels: weeklyData.map(item => item.day),
        datasets: [
          {
            ...weeklyStats.datasets[0],
            data: weeklyData.map(item => item.borrowed)
          },
          {
            ...weeklyStats.datasets[1],
            data: weeklyData.map(item => item.returned)
          }
        ]
      });

      // Biểu đồ tháng
      const monthlyResponse = await axios.get('http://127.0.0.1:5000/api/monthly-data');
      const monthlyData = monthlyResponse.data;

      setMonthlyStats({
        labels: monthlyData.map(item => item.month),
        datasets: [
          {
            ...monthlyStats.datasets[0],
            data: monthlyData.map(item => item.borrowed)
          },
          {
            ...monthlyStats.datasets[1],
            data: monthlyData.map(item => item.returned)
          }
        ]
      });

      // Biểu đồ thể loại sách
      const bookCategoryResponse = await axios.get('https://library-mana.azurewebsites.net/books/category-distribution');
      const bookCategoryData = bookCategoryResponse.data;

      setBookCategoryStats({
        labels: Object.keys(bookCategoryData),
        datasets: [
          {
            ...bookCategoryStats.datasets[0],
            data: Object.values(bookCategoryData)
          }
        ]
      });

    } catch (error) {
      console.error('Lỗi tải dữ liệu biểu đồ:', error);
    }
  };

  // Component thẻ thống kê
  const StatCard = ({ icon: Icon, title, value }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="bg-blue-100 p-4 rounded-full mr-4">
          <Icon className="text-blue-500 text-2xl" />
        </div>
        <div>
          <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
          <span className="text-xl font-bold">{value.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    fetchDashboardStats();
    fetchChartStats();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={FaBook} 
          title="Tổng Số Sách" 
          value={dashboardStats.totalBooks} 
        />
        <StatCard 
          icon={FaBookOpen} 
          title="Sách Đang Cho Mượn" 
          value={dashboardStats.borrowedBooks} 
        />
        <StatCard 
          icon={FaUsers} 
          title="Tổng Số Người Dùng" 
          value={dashboardStats.totalUsers} 
        />
        <StatCard 
          icon={FaUserCheck} 
          title="Sách Đã Trả" 
          value={dashboardStats.returnedBooks} 
        />
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biểu đồ Donut */}
        <DonutChart />

        {/* Biểu đồ Cột Tuần */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-lg font-semibold mb-4">Biểu đồ Mượn Trả Theo Tuần</div>
          {weeklyStats.labels.length > 0 ? (
            <Bar 
              data={weeklyStats} 
              options={{ 
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }} 
              height={250} 
            />
          ) : (
            <div>Đang tải dữ liệu...</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Biểu đồ Thể Loại Sách */}
        <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: '350px' }}>
          <div className="text-lg font-semibold mb-4">Số Lượng Sách Theo Thể Loại</div>
          {bookCategoryStats.labels.length > 0 ? (
            <Bar 
              data={bookCategoryStats} 
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Số Lượng Sách'
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} 
              height={300} 
            />
          ) : (
            <div>Đang tải dữ liệu...</div>
          )}
        </div>

        {/* Biểu đồ Cột Tháng */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-lg font-semibold mb-4">Biểu đồ Mượn Trả Theo Tháng</div>
          {monthlyStats.labels.length > 0 ? (
            <Bar 
              data={monthlyStats} 
              options={{ 
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }} 
              height={250} 
            />
          ) : (
            <div>Đang tải dữ liệu...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;