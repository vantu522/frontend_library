import React from 'react';
import { Pie } from 'react-chartjs-2'; // Import biểu đồ tròn
import { FaUsers, FaChartBar, FaDollarSign, FaCogs } from 'react-icons/fa'; // Import các icon từ react-icons
import './AdminDashboard.css'; // Import CSS

// Cố định dữ liệu mẫu cho biểu đồ
const pieData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['red', 'blue', 'yellow'],
      hoverBackgroundColor: ['darkred', 'darkblue', 'darkyellow'],
    },
  ],
};

const AdminDashboard = () => {
  // Cố định dữ liệu cho các tổng và thay đổi theo tháng
  const monthlyChanges = {
    users: {
      total: 1234,
      change: 5, // % thay đổi so với tháng trước
    },
    reports: {
      total: 56789,
      change: -3,
    },
    revenue: {
      total: 12,
      change: 10,
    },
    settings: {
      total: 89,
      change: -2,
    },
  };

  const getChangeClass = (change) => {
    return change >= 0 ? 'increase' : 'decrease';
  };

  return (
    <div className="content">
      <div className="parent">
        
        <div className="div1">1</div>

        {/* Ô 2 - Tổng người dùng */}
        <div className="div2">
          <div className="total-box">
            <div className="left-side">
              <FaUsers className="icon" />
              <div className="name">Người Dùng</div>
            </div>
            <div className="right-side">
              <div className="total">{monthlyChanges.users.total} Users</div>
              <div className="line"></div>
              <div className={`trend ${getChangeClass(monthlyChanges.users.change)}`}>
                {monthlyChanges.users.change}% {monthlyChanges.users.change >= 0 ? 'Increase' : 'Decrease'}
              </div>
            </div>
          </div>
        </div>

        <div className="div3">3</div>

        {/* Ô 4 - Tổng báo cáo */}
        <div className="div4">
          <div className="total-box">
            <div className="left-side">
              <FaChartBar className="icon" />
              <div className="name">Truy Cập</div>
            </div>
            <div className="right-side">
              <div className="total">{monthlyChanges.reports.total} Lượt</div>
              <div className="line"></div>
              <div className={`trend ${getChangeClass(monthlyChanges.reports.change)}`}>
                {monthlyChanges.reports.change}% {monthlyChanges.reports.change >= 0 ? 'Increase' : 'Decrease'}
              </div>
            </div>
          </div>
        </div>

        <div className="div8">
          <div className="total-box">
            <div className="left-side">
              <FaDollarSign className="icon" />
              <div className="name">Phí Phạt</div>
            </div>
            <div className="right-side">
              <div className="total">${monthlyChanges.revenue.total}</div>
              <div className="line"></div>
              <div className={`trend ${getChangeClass(monthlyChanges.revenue.change)}`}>
                {monthlyChanges.revenue.change}% {monthlyChanges.revenue.change >= 0 ? 'Increase' : 'Decrease'}
              </div>
            </div>
          </div>
        </div>

        <div className="div9">
          <div className="total-box">
            <div className="left-side">
              <FaCogs className="icon" />
              <div className="name">Mượn Trả</div>
            </div>
            <div className="right-side">
              <div className="total">{monthlyChanges.settings.total} Mượn Trả</div>
              <div className="line"></div>
              <div className={`trend ${getChangeClass(monthlyChanges.settings.change)}`}>
                {monthlyChanges.settings.change}% {monthlyChanges.settings.change >= 0 ? 'Increase' : 'Decrease'}
              </div>
            </div>
          </div>
        </div>

        <div className="div10">10</div>

        {/* Thêm biểu đồ tròn vào ô div11 */}
        <div className="div11">
          <div className="chart-title">Biểu đồ Tròn</div>
          <Pie data={pieData} />
        </div>

        <div className="div12">12</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
