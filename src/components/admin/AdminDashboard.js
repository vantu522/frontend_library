import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { FaBook, FaBookOpen, FaUsers, FaUserCheck } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import DonutChart from './DonutChart ';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

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
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
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
        axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/books/total').then(res => res.data),
        axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/transactions/count-borrowed').then(res => res.data),
        axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/members/count').then(res => res.data),
        axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/transactions/count-returned').then(res => res.data)
      ]);

      setDashboardStats({
        totalBooks: typeof totalBooks === 'number' ? totalBooks : 500,
        borrowedBooks: typeof borrowedBooks === 'number' ? borrowedBooks : 150,
        totalUsers: typeof totalUsers === 'number' ? totalUsers : 1234,
        returnedBooks: typeof returnedBooks === 'number' ? returnedBooks : 456
      });
    } catch (error) {
      console.error('Lỗi tải thống kê dashboard:', error);
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
      // Fetch weekly data
      const weeklyResponse = await axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/transactions/weekly-stats');
      const weeklyData = weeklyResponse.data;

      if (Array.isArray(weeklyData)) {
        setWeeklyStats(weeklyData.map(item => ({
          day: item.day,
          borrowed: item.borrowed,
          returned: item.returned
        })));
      } else {
        console.error('Dữ liệu tuần không hợp lệ:', weeklyData);
      }

      // Fetch monthly data
      const monthlyResponse = await axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/transactions/statistics');
      const monthlyData = monthlyResponse.data;

      if (Array.isArray(monthlyData)) {
        setMonthlyStats(monthlyData.map(item => ({
          month: item.month,
          borrowed: item.borrowed,
          returned: item.returned
        })));
      } else {
        console.error('Dữ liệu tháng không hợp lệ:', monthlyData);
      }

      // Fetch top borrowed books
      const topBooksResponse = await axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/transactions/topBorrow');
      const topBooksData = topBooksResponse.data;
      console.log("test ",topBooksData);

      setBookCategoryStats({
        labels: topBooksData.map(book => book.title),
        datasets: [
          {
            ...bookCategoryStats.datasets[0],
            data: topBooksData.map(book => book.borrowCount)
          }
        ]
      });

    } catch (error) {
      console.error('Lỗi tải dữ liệu biểu đồ:', error);
      // Set some sample data in case of error
      setWeeklyStats([
        { day: 'T2', borrowed: 45, returned: 32 },
        { day: 'T3', borrowed: 55, returned: 45 },
        { day: 'T4', borrowed: 40, returned: 38 },
        { day: 'T5', borrowed: 65, returned: 50 },
        { day: 'T6', borrowed: 35, returned: 40 },
        { day: 'T7', borrowed: 50, returned: 45 },
        { day: 'CN', borrowed: 30, returned: 25 }
      ]);
      
      setMonthlyStats([
        { month: 'Jan', borrowed: 150, returned: 130 },
        { month: 'Feb', borrowed: 180, returned: 160 },
        { month: 'Mar', borrowed: 200, returned: 180 },
        { month: 'Apr', borrowed: 160, returned: 150 },
        { month: 'May', borrowed: 190, returned: 170 }
      ]);
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

  // Component biểu đồ đường
  const LineChartComponent = ({ data, title }) => (
    <div className="bg-white p-6 rounded-lg shadow-md h-80">
      <div className="text-lg font-semibold mb-4">{title}</div>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={data === weeklyStats ? "day" : "month"}
              tickLine={false}
              axisLine={true}
            />
            <YAxis 
              tickLine={false}
              axisLine={true}
              width={40}
            />
            <RechartsTooltip />
            <Line 
              type="monotone" 
              dataKey="borrowed" 
              stroke="#2563eb" 
              strokeWidth={2} 
              name="Sách mượn"
              dot={{ fill: '#2563eb', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="returned" 
              stroke="#16a34a" 
              strokeWidth={2} 
              name="Sách trả"
              dot={{ fill: '#16a34a', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">Đang tải dữ liệu...</div>
        </div>
      )}
    </div>
  );

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    fetchDashboardStats();
    fetchChartStats();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={FaBook} title="Tổng Số Sách" value={dashboardStats.totalBooks} />
        <StatCard icon={FaBookOpen} title="Sách Đang Cho Mượn" value={dashboardStats.borrowedBooks} />
        <StatCard icon={FaUsers} title="Tổng Số Người Dùng" value={dashboardStats.totalUsers} />
        <StatCard icon={FaUserCheck} title="Sách Đã Trả" value={dashboardStats.returnedBooks} />
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DonutChart />
        <LineChartComponent 
          data={weeklyStats} 
          title="Biểu đồ Mượn Trả Theo Tuần" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md h-80">
          <div className="text-lg font-semibold mb-4">Top sách mượn nhiều nhất</div>
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
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">Đang tải dữ liệu...</div>
            </div>
          )}
        </div>
        <LineChartComponent 
          data={monthlyStats} 
          title="Biểu đồ Mượn Trả Theo Tháng" 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;