import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../common/admin/Modal/Modal';
import logo from '../../../assets/images/adminlogo.jpg';
import { toast } from 'react-toastify';
import ChangePassword from '../../../components/admin/ChangePassword/ChangePassword';  // Import ChangePassword

const Navbar = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [adminName, setAdminName] = useState('ADMIN WEB'); // Tên admin mặc định
  const navigate = useNavigate();

  // Cập nhật thời gian
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lấy tên admin từ localStorage
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('admin'));
    if (adminData && adminData.name) {
      setAdminName(adminData.name);
    } else {
      toast.error('Vui lòng đăng nhập lại!');
      navigate('/admin/login');
    }
  }, [navigate]);

  // Toggle menu và đóng khi click bên ngoài
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

  // Xử lý đăng xuất
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

  // Mở modal đổi mật khẩu
  const handleChangePassword = () => setChangePasswordModalOpen(true);

  return (
    <div className="fixed top-0 left-64 sm:left-48 md:left-64 w-100% h-16 bg-gray-800 text-white flex justify-between items-center px-5 z-20 shadow-md">
      {/* Hình ảnh và tên admin */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
        <h1 className="text-lg font-semibold">{adminName}</h1>
      </div>

      {/* Hiển thị thời gian */}
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString()}
        </span>
        <FontAwesomeIcon
          icon={faCog}
          onClick={toggleMenu}
          className="text-xl cursor-pointer hover:text-gray-400 transition menu"
        />
        {isMenuOpen && (
          <div className="absolute top-16 right-0 bg-gray-700 p-2 rounded-lg shadow-lg flex flex-col gap-2 z-10 menu">
            <button
              onClick={handleChangePassword}
              className="text-white text-sm px-4 py-2 hover:bg-gray-600 rounded-lg"
            >
              Đổi mật khẩu
            </button>
            <button
              onClick={handleLogout}
              className="text-white text-sm px-4 py-2 hover:bg-gray-600 rounded-lg"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>

      {/* Modal đổi mật khẩu */}
      <ChangePassword
        isOpen={isChangePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
      />

      {/* Modal xác nhận đăng xuất */}
      <Modal isOpen={isLogoutModalOpen} onClose={handleLogoutCancel}>
        <h2 className="text-xl font-semibold mb-4">Bạn có chắc chắn muốn đăng xuất?</h2>
        <div className="flex justify-between gap-4">
          <button
            onClick={handleLogoutConfirm}
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Xác nhận
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
