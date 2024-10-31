import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Wisdom's Beacon</div>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-btn">Trang chủ</Link>
          </li>
          <li>
            <Link to="/introduce" className="nav-btn">Giới thiệu</Link>
          </li>
          <li>
            <Link to="/category" className="nav-btn">Danh mục</Link>
          </li>
          <li>
            <Link to="/shopcart" className="nav-btn">Giỏ sách</Link>
          </li>
        </ul>
      </nav>
      <div className="login-btn">
        <Link to="/login" className="login">Login</Link>
      </div>
    </header>
  );
};

export default Header;
