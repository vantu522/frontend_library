import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { FaBook, FaBookOpen, FaUsers, FaUserCheck } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import DonutChart from '../DonutChart ';

ChartJS.register(ArcElement, ChartTooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement);

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalBooks: { value: 0, change: 0 },
    borrowedBooks: { value: 0, change: 0 },
    totalUsers: { value: 0, change: 0 },
    activeUsers: { value: 0, change: 0 }
  });

  const [monthlyChanges, setMonthlyChanges] = useState({
    users: { total: 0, change: 0 },
    reports: { total: 0, change: 0 },
    revenue: { total: 0, change: 0 },
    settings: { total: 0, change: 0 },
  });

  const [weeklyStats, setWeeklyStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState({
    labels: [],
    datasets: []
  });
  const [bookCategoryStats, setBookCategoryStats] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        // Fetch dashboard statistics
        const fetchWithFallback = async (url, defaultValue) => {
          try {
            const response = await axios.get(url);
            return {
              value: response.data.total || defaultValue
            };
          } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            return {
              value: defaultValue
            };
          }
        };
    
        // Fetch từng metric với API riêng
        const [
          totalBooksData,
          borrowedBooksData, 
          totalUsersData, 
          activeUsersData
        ] = await Promise.all([
          fetchWithFallback(
            'https://library-mana.azurewebsites.net/books/total', 
            500,  // Giá trị mặc định
            5     // Thay đổi mặc định
          ),
          fetchWithFallback(
            'https://library-mana.azurewebsites.net/transactions/count-borrowed', 
            150,  // Giá trị mặc định
            3     // Thay đổi mặc định
          ),
          fetchWithFallback(
            'https://library-mana.azurewebsites.net/members/count', 
            1234, // Giá trị mặc định
            2     // Thay đổi mặc định
          ),
          fetchWithFallback(
            'https://library-mana.azurewebsites.net/transactions/count-returned', 
            456,  // Giá trị mặc định
            -1    // Thay đổi mặc định
          )
        ]);
    
        // Cập nhật state với dữ liệu từ API hoặc giá trị mặc định
        setDashboardStats({
          totalBooks: totalBooksData,
          borrowedBooks: borrowedBooksData,
          totalUsers: totalUsersData,
          activeUsers: activeUsersData
        });

        // Fetch weekly stats
        const weeklyResponse = await axios.get('https://library-mana.azurewebsites.net/transactions/weekly-stats');
        setWeeklyStats(weeklyResponse.data);

        // Fetch monthly stats - Sửa lỗi API
        try {
          const monthlyResponse = await axios.get('https://library-mana.azurewebsites.net/transactions/weekly-stats');
          const monthlyData = monthlyResponse.data;

          const monthlyChartData = {
            labels: monthlyData.map(item => item.month || 'Tháng'),
            datasets: [
              {
                label: 'Mượn',
                data: monthlyData.map(item => item.borrowed || 0),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
              {
                label: 'Trả',
                data: monthlyData.map(item => item.returned || 0),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              }
            ]
          };

          setMonthlyStats(monthlyChartData);
        } catch (monthlyError) {
          console.error('Lỗi tải dữ liệu tháng:', monthlyError);
          // Set default data nếu API bị lỗi
          setMonthlyStats({
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
            datasets: [
              {
                label: 'Mượn',
                data: [100, 120, 90, 110, 130],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
              {
                label: 'Trả',
                data: [90, 100, 80, 95, 110],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              }
            ]
          });
        }

        // Fetch book category stats
        const bookCategoryResponse = await axios.get('https://library-mana.azurewebsites.net/books/category-distribution');
        const bookCategoryData = bookCategoryResponse.data;

        // Transform book category data for chart
        const bookCategoryChartData = {
          labels: Object.keys(bookCategoryData),
          datasets: [
            {
              label: 'Số Lượng Sách',
              data: Object.values(bookCategoryData),
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(199, 199, 199, 0.6)',
                'rgba(83, 102, 255, 0.6)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)',
                'rgba(83, 102, 255, 1)'
              ],
              borderWidth: 1,
            }
          ]
        };

        setBookCategoryStats(bookCategoryChartData);

        // Example transformation for monthly changes (replace with actual API if needed)
        setMonthlyChanges({
          users: { total: 1234, change: 5 },
          reports: { total: 56789, change: -3 },
          revenue: { total: 12, change: 10 },
          settings: { total: 89, change: -2 },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ icon: Icon, title, value, change }) => {
    const changeClass = change >= 0 ? 'text-green-500' : 'text-red-500';
    const changeSymbol = change >= 0 ? '+' : '';

    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="bg-blue-100 p-4 rounded-full mr-4">
          <Icon className="text-blue-500 text-2xl" />
        </div>
        <div>
          <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
          <div className="flex items-center">
            <span className="text-xl font-bold mr-2">{value.toLocaleString()}</span>
            <span className={`text-sm ${changeClass}`}>
              {changeSymbol}{change}%
            </span>
          </div>
        </div>
      </div>
    );
  };

  const barData = {
    labels: weeklyStats.map((item) => item.day),
    datasets: [
      {
        label: 'Mượn',
        data: weeklyStats.map((item) => item.borrowed),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Trả',
        data: weeklyStats.map((item) => item.returned),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Dashboard Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={FaBook} 
          title="Tổng Số Sách" 
          value={dashboardStats.totalBooks.value} 
          change={dashboardStats.totalBooks.change} 
        />
        <StatCard 
          icon={FaBookOpen} 
          title="Sách Đang Cho Mượn" 
          value={dashboardStats.borrowedBooks.value} 
          change={dashboardStats.borrowedBooks.change} 
        />
        <StatCard 
          icon={FaUserCheck} 
          title="Số sách đã trả" 
          value={dashboardStats.activeUsers.value} 
          change={dashboardStats.activeUsers.change} 
        />
        <StatCard 
          icon={FaUsers} 
          title="Tổng Số Người Dùng" 
          value={dashboardStats.totalUsers.value} 
          change={dashboardStats.totalUsers.change} 
        />
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biểu đồ Donut */}
        <DonutChart />

        {/* Biểu đồ Cột Tuần */}
        <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: '100%', width: '100%' }}>
          <div className="text-lg font-semibold mb-4">Biểu đồ Mượn Trả Theo Tuần</div>
          {weeklyStats.length > 0 ? (
            <Bar 
              data={barData} 
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
        <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: '350px', width: '100%' }}>
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
                    display: false // Ẩn legend vì chỉ có 1 dataset
                  },
                  title: {
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
        <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: '100%', width: '100%' }}>
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