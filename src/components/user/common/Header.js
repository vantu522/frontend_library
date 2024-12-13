import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircle, Bell, LogOut } from 'lucide-react';

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Giả lập dữ liệu người dùng và thông báo
  useEffect(() => {
    // Trong thực tế, bạn sẽ lấy thông tin từ localStorage, Redux hoặc context
    const mockUser = {
      name: 'Nguyễn Văn A',
      avatar: 'https://example.com/avatar.jpg',
    };
    const mockNotifications = [
      { id: 1, message: 'Bạn có sách mới' },
      { id: 2, message: 'Ưu đãi đặc biệt' },
    ];

    // Giả định đăng nhập thành công
    setIsLoggedIn(true);
    setUser(mockUser);
    setNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 20);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const handleLogout = () => {
    // Xử lý đăng xuất
    setIsLoggedIn(false);
    setUser(null);
    setNotifications([]);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } bg-white bg-opacity-95 backdrop-blur-sm shadow-md py-4 px-6 md:px-10`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a className="flex items-center gap-4" href='/'>
          <img
            src="/assets/images/logo-preview.png"
            alt="Logo"
            className="w-12 h-12 object-contain transition-transform duration-300 hover:scale-105"
          />
          <span className="text-2xl font-bold text-gray-800 uppercase tracking-wider hidden md:inline-block">
            Wisdom's Beacon
          </span>
        </a>
        <nav>
          <ul className="flex gap-1 md:gap-2">
            {[
              { name: 'Trang chủ', path: '/' },
              { name: 'Danh mục', path: '/category' },
              { name: 'Tin tức', path: '/news' },
              { name: 'Giỏ sách', path: '/shopcart' },
            ].map((item) => (
              <li key={item.path}>
                <NavLink
                  exact
                  to={item.path}
                  className={({ isActive }) =>
                    `text-gray-700 font-medium text-lg md:text-xl px-3 py-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'text-blue-600 font-semibold bg-blue-50'
                        : 'hover:text-blue-600 hover:bg-blue-50'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Icon thông báo */}
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </div>

              {/* Avatar người dùng */}
              <div className="flex items-center space-x-2">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />
                <span className="hidden md:inline text-gray-800 font-medium">
                  {user.name}
                </span>
              </div>

              {/* Nút đăng xuất */}
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </>
          ) : (
            <NavLink
              to="/loginemail"
              className="flex items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded-full transition-all duration-300 hover:bg-blue-700 shadow-md hover:shadow-lg"
            >
              <UserCircle className="w-5 h-5" />
              <span className="hidden md:inline">Đăng nhập</span>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;