import React from 'react';
import { NavLink } from 'react-router-dom';
import './common.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/images/logomain.jpg" alt="Logo" className="logo-image" />
        Wisdom's Beacon
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <NavLink 
              exact 
              to="/" 
              className="nav-btn" 
              activeClassName="active-nav-btn"
            >
              TRANG CHỦ
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/introduce" 
              className="nav-btn" 
              activeClassName="active-nav-btn"
            >
              TIN TỨC
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/category" 
              className="nav-btn" 
              activeClassName="active-nav-btn"
            >
              DANH MỤC
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/shopcart" 
              className="nav-btn" 
              activeClassName="active-nav-btn"
            >
              GIỎ SÁCH
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="login-btn">
        <NavLink 
          to="/loginemail" 
          className="login"
          activeClassName="active-nav-btn"
        >
          <img src="/assets/images/loginlogo.jpg" alt="Login Icon" className="login-icon" /> Login
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
