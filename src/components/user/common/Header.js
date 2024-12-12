import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } bg-gradient-to-r from-white to-gray-100 shadow-md py-4 px-10 flex justify-between items-center`}
    >
      <div className="flex items-center gap-4">
        <img
          src="/assets/images/logo-preview.png"
          alt="Logo"
          className="w-12 h-12 object-contain transform transition-transform duration-300 hover:scale-105"
        />
        <span className="text-2xl font-bold text-gray-800 uppercase tracking-wider">
          Wisdom's Beacon
        </span>
      </div>
      <nav>
        <ul className="flex gap-8">
          <li>
            <NavLink
              exact
              to="/"
              className={({ isActive }) =>
                `text-gray-700 font-medium text-2xl px-4 py-2 rounded transition-all duration-300 ${
                  isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600 hover:bg-blue-100'
                }`
              }
            >
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `text-gray-700 font-medium text-2xl px-4 py-2 rounded transition-all duration-300 ${
                  isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600 hover:bg-blue-100'
                }`
              }
            >
              Tin tức
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                `text-gray-700 font-medium text-2xl px-4 py-2 rounded transition-all duration-300 ${
                  isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600 hover:bg-blue-100'
                }`
              }
            >
              Danh mục
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shopcart"
              className={({ isActive }) =>
                `text-gray-700 font-medium text-2xl px-4 py-2 rounded transition-all duration-300 ${
                  isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600 hover:bg-blue-100'
                }`
              }
            >
              Giỏ sách
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <NavLink
          to="/favorites"
          className="flex items-center gap-2 text-gray-700 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faHeart} className="text-red-500 text-xl" />
          <span>Yêu thích</span>
        </NavLink>
        <NavLink
          to="/notifications"
          className="flex items-center gap-2 text-gray-700 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faBell} className="text-yellow-500 text-xl" />
          <span>Thông báo</span>
        </NavLink>
        <NavLink
          to="/loginemail"
          className="flex items-center gap-2 text-white bg-blue-600 px-5 py-2 rounded-lg transition-all duration-300 hover:bg-blue-700 shadow-lg"
        >
          <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
          <span>Login</span>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
