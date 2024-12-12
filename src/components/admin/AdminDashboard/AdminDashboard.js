import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import { FaUsers, FaChartBar, FaDollarSign, FaCogs } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import DonutChart from '../DonutChart ';
ChartJS.register(ArcElement, ChartTooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement);


  // Dữ liệu biểu đồ Bar và Line
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Truy Cập',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Phí Phạt',
        data: [12, 19, 3, 5, 2],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  };



const AdminDashboard = () => {
    const monthlyChanges = {
      users: { total: 1234, change: 5 },
      reports: { total: 56789, change: -3 },
      revenue: { total: 12, change: 10 },
      settings: { total: 89, change: -2 },
    };

  const getChangeClass = (change) => {
    return change >= 0 ? 'increase' : 'decrease';
  };

return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Người Dùng */}
        <div className="total-box flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center gap-4">
            <FaUsers className="text-3xl text-blue-500" />
            <div>
              <div className="font-semibold text-lg">Người Dùng</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold">{monthlyChanges.users.total} Users</div>
            <div className={`text-sm ${getChangeClass(monthlyChanges.users.change)}`}>
              {monthlyChanges.users.change}% {monthlyChanges.users.change >= 0 ? 'Increase' : 'Decrease'}
            </div>
          </div>
        </div>

        {/* Truy Cập */}
        <div className="total-box flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center gap-4">
            <FaChartBar className="text-3xl text-green-500" />
            <div>
              <div className="font-semibold text-lg">Truy Cập</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold">{monthlyChanges.reports.total} Lượt</div>
            <div className={`text-sm ${getChangeClass(monthlyChanges.reports.change)}`}>
              {monthlyChanges.reports.change}% {monthlyChanges.reports.change >= 0 ? 'Increase' : 'Decrease'}
            </div>
          </div>
        </div>

        {/* Phí Phạt */}
        <div className="total-box flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center gap-4">
            <FaDollarSign className="text-3xl text-yellow-500" />
            <div>
              <div className="font-semibold text-lg">Phí Phạt</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold">${monthlyChanges.revenue.total}</div>
            <div className={`text-sm ${getChangeClass(monthlyChanges.revenue.change)}`}>
              {monthlyChanges.revenue.change}% {monthlyChanges.revenue.change >= 0 ? 'Increase' : 'Decrease'}
            </div>
          </div>
        </div>

        {/* Mượn Trả */}
        <div className="total-box flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center gap-4">
            <FaCogs className="text-3xl text-purple-500" />
            <div>
              <div className="font-semibold text-lg">Mượn Trả</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold">{monthlyChanges.settings.total} Mượn Trả</div>
            <div className={`text-sm ${getChangeClass(monthlyChanges.settings.change)}`}>
              {monthlyChanges.settings.change}% {monthlyChanges.settings.change >= 0 ? 'Increase' : 'Decrease'}
            </div>
          </div>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biểu đồ Donut */}
        <DonutChart />

        {/* Biểu đồ Cột */}
        <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: '100%', width: '100%' }}>
          <div className="text-lg font-semibold mb-4">Biểu đồ Cột</div>
          <Bar data={barData} options={{ responsive: false }} height={250} />
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Biểu đồ Đường (Thu nhỏ) */}
        <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: '350px', width: '100%' }}>
          <div className="text-lg font-semibold mb-4">Biểu đồ Đường</div>
          <Line data={lineData} options={{ maintainAspectRatio: false }} height={300} />
        </div>

        {/* Biểu đồ Cột thêm */}
        <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: '100%', width: '100%' }}>
          <div className="text-lg font-semibold mb-4">Biểu đồ Cột Thêm</div>
          <Bar data={barData} options={{ responsive: false }} height={250} />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
