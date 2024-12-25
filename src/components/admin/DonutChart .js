import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import staService from '../../services/statisctics';

const DonutChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Bảng màu cho biểu đồ
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
    '#8884D8', '#82CA9D', '#FF6384', '#36A2EB', '#FFCE56'
  ];

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        // Sử dụng service để lấy dữ liệu
        const data = await staService.fetchCategoryDistribution();
        
        // Chuyển đổi dữ liệu sang định dạng biểu đồ
        const formattedData = Object.entries(data).map(([name, value]) => ({
          name,
          value
        }));
        
        setCategoryData(formattedData);
        setError(null);
      } catch (err) {
        setError(err.message || 'Đã có lỗi xảy ra khi tải dữ liệu');
        setCategoryData([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);


  // Trạng thái loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Xử lý lỗi
  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-xl text-red-600 font-bold mb-4">Lỗi Tải Dữ Liệu</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
      
      <div className=" ">
        {/* Biểu đồ tròn */}
        <div className="w-full h-[300px] ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                // label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [
                  `${value} cuốn`, 
                  name
                ]}
              />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
  );
};

export default DonutChart;