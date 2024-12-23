import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/adminimg.jpg';
import Modal from '../../../common/admin/Modal/Modal';  // Nhập Modal từ file đã tạo
import { toast } from 'react-toastify';



const Navbar = () => {
    const [dateTime, setDateTime] = useState(new Date());
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);  // Modal đổi mật khẩu
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);  // Modal xác nhận đăng xuất
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        setLogoutModalOpen(true);  // Mở modal xác nhận đăng xuất
    };

   // Trong component Navbar, thay đổi hàm handleLogoutConfirm
const handleLogoutConfirm = () => {
    try {
        // Xóa thông tin admin khỏi localStorage
        localStorage.removeItem('admin');
        
        // Hiển thị thông báo thành công
        toast.success("Đăng xuất thành công!");
        
        // Chuyển hướng về trang đăng nhập
        window.location.href = "/admin/login";
        
    } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
        toast.error("Có lỗi xảy ra khi đăng xuất!");
    }
    
    // Đóng modal
    setLogoutModalOpen(false);
};

    const handleLogoutCancel = () => {
        setLogoutModalOpen(false);  // Đóng modal khi huỷ bỏ
    };

    const handleChangePassword = () => {
        setChangePasswordModalOpen(true);  // Mở modal đổi mật khẩu
    };

    const handleCloseModal = () => {
        setChangePasswordModalOpen(false);  // Đóng modal đổi mật khẩu
    };

    return (
        
        <div className="fixed top-0 left-64 sm:left-48 md:left-64 w-[1880px] h-16 bg-gray-800 text-white flex justify-between items-center px-5 z-20 shadow-md">
            <div className="flex items-center space-x-4">
                {/* Hình ảnh tròn */}
                <img
                    src={logo}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col items-start space-y-1">
                    <h1 className="text-lg mb-0">Admin:</h1>
                </div>
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <span className="text-sm">
                    {dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString()}
                </span>
                <FontAwesomeIcon 
                    icon={faCog} 
                    onClick={toggleMenu} 
                    className="text-xl cursor-pointer hover:text-gray-400 transition"
                />
                {isMenuOpen && (
                    <div className="absolute top-16 right-0 bg-gray-700 p-2 rounded-lg shadow-lg flex flex-col gap-2 z-10">
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

            {/* Modal cho đổi mật khẩu */}
            <Modal isOpen={isChangePasswordModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-semibold mb-4">Đổi Mật Khẩu</h2>
                {/* Nội dung form đổi mật khẩu */}
                <form>
                    <div className="mb-4">
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu hiện tại
                        </label>
                        <input
                            id="current-password"
                            type="password"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu mới
                        </label>
                        <input
                            id="new-password"
                            type="password"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                            Xác nhận mật khẩu mới
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Đổi Mật Khẩu
                    </button>
                </form>
            </Modal>

            {/* Modal xác nhận đăng xuất */}
            <Modal isOpen={isLogoutModalOpen} onClose={handleLogoutCancel}>
                <h2 className="text-xl font-semibold mb-4">Bạn có chắc chắn muốn đăng xuất?</h2>
                <div className="flex justify-between gap-4">
                    <button
                        onClick={handleLogoutConfirm}
                        className="w-[100px]  py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Xác nhận
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Navbar;
