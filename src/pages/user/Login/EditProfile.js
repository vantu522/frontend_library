import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Thêm styles cho animations
const style = document.createElement('style');
style.textContent = `
  @keyframes popup {
    0% {
      opacity: 0;
      transform: scale(0.8) translateY(20px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes timer {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  .animate-popup {
    animation: popup 0.3s ease-out;
  }

  .animate-timer {
    animation: timer linear forwards;
  }
`;
document.head.appendChild(style);

const Popup = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      ></div>
      <div className={`
        relative px-8 py-6 rounded-lg shadow-2xl
        transform transition-all duration-300 ease-out
        animate-popup
        ${type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'}
        text-white min-w-[300px]
      `}>
        <div className="flex items-center gap-3">
          {type === 'success' ? (
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
          <p className="text-lg font-medium">{message}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-lg">
          <div 
            className="h-full bg-white/40 rounded-lg animate-timer"
            style={{ animationDuration: '3000ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const EditProfile = () => {
  const navigate = useNavigate();

  const member = JSON.parse(localStorage.getItem('user') || '{}');

  const [userData, setUserData] = useState({
    name: member.name || '',
    email: member.email || '',
    phoneNumber: member.phoneNumber || ''
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });

  const memberId = member.memberId;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/members/update/${memberId}`,
        userData
      );
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify({ ...member, ...userData }));
        setPopup({ show: true, message: 'Cập nhật hồ sơ thành công!', type: 'success' });
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setPopup({ show: true, message: 'Cập nhật hồ sơ thất bại. Vui lòng thử lại.', type: 'error' });
      
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80">
        <div className="text-xl font-semibold text-gray-700">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50">
      <div className="mt-20 w-full max-w-2xl p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Chỉnh sửa hồ sơ</h2>
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
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      )}
    </div>
  );
};

export default EditProfile;