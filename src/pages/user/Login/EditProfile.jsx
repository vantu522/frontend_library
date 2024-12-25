import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const memberId = localStorage.getItem('memberId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/members/${memberId}`);
        setUserData({
          name: response.data.name || '',
          email: response.data.email || '',
          phoneNumber: response.data.phoneNumber || '',
          password: '', // Do not prefill password for security reasons
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Không thể tải thông tin người dùng.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [memberId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/members/update/${memberId}`,
        userData
      );
      if (response.status === 200) {
        setMessage('Cập nhật hồ sơ thành công!');
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Cập nhật hồ sơ thất bại. Vui lòng thử lại.');
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50">
      <div className="mt-20 w-full max-w-2xl p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Chỉnh sửa hồ sơ</h2>
        {message && (
          <div
            className={`mb-4 p-2 rounded ${
              message.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
