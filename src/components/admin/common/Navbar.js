import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../common/admin/Modal/Modal';
import logo from '../../../assets/images/adminlogo.jpg';
import { toast } from 'react-toastify';
import ChangePassword from '../../../components/admin/ChangePassword/ChangePassword';

const Navbar = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [adminName, setAdminName] = useState('ADMIN WEB');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('admin'));
    if (adminData && adminData.name) {
      setAdminName(adminData.name);
    } else {
      toast.error('Vui lòng đăng nhập lại!');
      navigate('/admin/login');
    }
  }, [navigate]);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.menu')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleLogout = () => setLogoutModalOpen(true);

  const handleLogoutConfirm = () => {
    try {
      localStorage.removeItem('admin');
      toast.success('Đăng xuất thành công!');
      navigate('/admin/login');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      toast.error('Có lỗi xảy ra khi đăng xuất!');
    }
    setLogoutModalOpen(false);
  };

  const handleLogoutCancel = () => setLogoutModalOpen(false);

  const handleChangePassword = () => setChangePasswordModalOpen(true);

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-gray-800 text-white flex justify-between items-center px-5 z-20 shadow-md">
      {/* Phần trống bên trái để cân bằng layout */}
      <div className="flex-1"></div>

      {/* Hiển thị thời gian và menu ở giữa */}
      <div className="flex items-center gap-4">
        <span className="text-sm whitespace-nowrap">
          {dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString()}
        </span>
        <div className="relative">
          <img
            src={logo}
            alt="Settings"
            onClick={toggleMenu}
            className="w-6 h-6 cursor-pointer rounded-full hover:opacity-80 transition menu"
          />
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 bg-gray-700 p-2 rounded-lg shadow-lg flex flex-col gap-2 z-10 menu min-w-[150px]">
              <div className="text-white text-sm px-4 py-2 truncate">
                <strong>{adminName}</strong>
              </div>
              <button
                onClick={handleChangePassword}
                className="text-white text-sm px-4 py-2 hover:bg-gray-600 rounded-lg text-left"
              >
                Đổi mật khẩu
              </button>
              <button
                onClick={handleLogout}
                className="text-white text-sm px-4 py-2 hover:bg-gray-600 rounded-lg text-left"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Phần trống bên phải để cân bằng layout */}
      <div className="flex-1"></div>

      <ChangePassword
        isOpen={isChangePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
      />

      <Modal isOpen={isLogoutModalOpen} onClose={handleLogoutCancel}>
        <h2 className="text-xl font-semibold mb-4">Bạn có chắc chắn muốn đăng xuất?</h2>
        <div className="flex justify-between gap-4">
          <button
            onClick={handleLogoutConfirm}
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Xác nhận
          </button>
          <button
            onClick={handleLogoutCancel}
            className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Hủy
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;

