"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBook, FaBookOpen, FaUsers, FaUserCheck, FaTrendingUp } from 'react-icons/fa';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import DonutChart from '../DonutChart ';

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    totalUsers: 0,
    returnedBooks: 0
  });

  const [weeklyStats, setWeeklyStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [topBorrowedBooks, setTopBorrowedBooks] = useState([]);

  const fetchDashboardStats = async () => {
    try {
      const [totalBooks, borrowedBooks, totalUsers, returnedBooks] = await Promise.all([
        axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/books/total'),
        axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/transactions/count-borrowed'),
        axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/members/count'),
        axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/transactions/count-returned')
      ]);

      setDashboardStats({
        totalBooks: totalBooks.data || 500,
        borrowedBooks: borrowedBooks.data || 150,
        totalUsers: totalUsers.data || 1234,
        returnedBooks: returnedBooks.data || 456
      });
    } catch (error) {
      console.error('Dashboard stats loading error:', error);
      setDashboardStats({
        totalBooks: 500,
        borrowedBooks: 150,
        totalUsers: 1234,
        returnedBooks: 456
      });
    }
  };

  const fetchChartStats = async () => {
    try {
      const [weeklyResponse, monthlyResponse, topBooksResponse] = await Promise.all([
        axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/transactions/weekly-stats'),
        axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/transactions/statistics'),
        axios.get('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/transactions/topBorrow')
      ]);

      setWeeklyStats(weeklyResponse.data || []);
      setMonthlyStats(monthlyResponse.data || []);
      setTopBorrowedBooks(topBooksResponse.data || []);
    } catch (error) {
      console.error('Chart data loading error:', error);
      setWeeklyStats([
        { day: 'Mon', borrowed: 45, returned: 32 },
        { day: 'Tue', borrowed: 55, returned: 45 },
        { day: 'Wed', borrowed: 40, returned: 38 },
        { day: 'Thu', borrowed: 65, returned: 50 },
        { day: 'Fri', borrowed: 35, returned: 40 },
        { day: 'Sat', borrowed: 50, returned: 45 },
        { day: 'Sun', borrowed: 30, returned: 25 }
      ]);
      
      setMonthlyStats([
        { month: 'Jan', borrowed: 150, returned: 130 },
        { month: 'Feb', borrowed: 180, returned: 160 },
        { month: 'Mar', borrowed: 200, returned: 180 },
        { month: 'Apr', borrowed: 160, returned: 150 },
        { month: 'May', borrowed: 190, returned: 170 }
      ]);

      setTopBorrowedBooks([
        { title: "The Great Gatsby", borrowCount: 186 },
        { title: "To Kill a Mockingbird", borrowCount: 305 },
        { title: "1984", borrowCount: 237 },
        { title: "Pride and Prejudice", borrowCount: 73 },
        { title: "The Catcher in the Rye", borrowCount: 209 },
        { title: "Lord of the Flies", borrowCount: 214 }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
      <div className="bg-blue-100 p-4 rounded-full mr-4">
        <Icon className="text-blue-500 text-2xl" />
      </div>
      <div>
        <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
        <span className="text-xl font-bold">{value.toLocaleString()}</span>
      </div>
    </div>
  );

  const ChartCard = ({ title, description, children }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
        {children}
      </div>
    </div>
  );
 
  const CustomBarChart = ({ data }) => (
    <ChartCard
      title="Top sách mượn nhiều nhất"
      description="6 tháng gần nhất"
    >
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="horizontal"
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              horizontal={true} 
              vertical={false}
              stroke="#e5e7eb"
              className="opacity-50"
            />
            <XAxis
              type="category"
              dataKey="title"
              tickLine={false}
              axisLine={false}
              tick={false}
            />
            <YAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              className="text-gray-500"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '0.375rem',
                color: '#fff',
                padding: '0.75rem'
              }}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Bar
              dataKey="borrowCount"
              fill="#3b82f6"
              radius={[4, 4, 4, 4]}
              barSize={30}
            >
              {data.map((entry, index) => (
                <text
                  key={`label-${index}`}
                  x={10}
                  y={index * 45 + 35}
                  fill="#4b5563"
                  className="text-sm font-medium"
                  textAnchor="start"
                >
                  {entry.title}
                </text>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );

  const LineChartComponent = ({ data, title, dataKeyX, dataKeyY1, dataKeyY2 }) => (
    <ChartCard title={title}>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis 
              dataKey={dataKeyX} 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              className="text-gray-500"
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              className="text-gray-500"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '0.375rem',
                color: '#fff',
                padding: '0.75rem'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey={dataKeyY1} stroke="#3b82f6" name="Sách mượn" />
            <Line type="monotone" dataKey={dataKeyY2} stroke="#10b981" name="Sách trả" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchDashboardStats(), fetchChartStats()]);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen mt-[-150px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-gray-700">Đang tải danh sách...</span>
      </div>
    );
  } 

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={FaBook} title="Tổng Số Sách" value={dashboardStats.totalBooks} />
        <StatCard icon={FaBookOpen} title="Sách Đang Cho Mượn" value={dashboardStats.borrowedBooks} />
        <StatCard icon={FaUsers} title="Tổng Số Người Dùng" value={dashboardStats.totalUsers} />
        <StatCard icon={FaUserCheck} title="Sách Đã Trả" value={dashboardStats.returnedBooks} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Biểu đồ Tròn">
          <div className="h-[400px]">
            <DonutChart />
          </div>
        </ChartCard>
        <LineChartComponent 
          data={weeklyStats} 
          title="Biểu đồ Mượn Trả Theo Tuần"
          dataKeyX="day"
          dataKeyY1="borrowed"
          dataKeyY2="returned"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CustomBarChart data={topBorrowedBooks} />
        <LineChartComponent 
          data={monthlyStats} 
          title="Biểu đồ Mượn Trả Theo Tháng"
          dataKeyX="month"
          dataKeyY1="borrowed"
          dataKeyY2="returned"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;