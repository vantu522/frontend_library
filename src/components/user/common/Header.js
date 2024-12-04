import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './common.css';

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
    <header className={`header ${!visible ? 'header--hidden' : ''}`}>
      <div className="logo">
        <img src="/assets/images/logo-preview.png" alt="Logo" className="logo-image" />
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
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/new" 
              className="nav-btn" 
              activeClassName="active-nav-btn"
            >
              Tin tức
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/category" 
              className="nav-btn" 
              activeClassName="active-nav-btn"
            >
              Danh mục
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/shopcart" 
              className="nav-btn" 
              activeClassName="active-nav-btn"
            >
              Giỏ sách 
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="login-btn">
        <NavLink to="/loginemail" className="login" activeClassName="active-nav-btn">
          <img src="/assets/images/loginlogo.jpg" alt="Login Icon" className="login-icon" /> Login
        </NavLink>
      </div>
    </header>
  );
};

export default Header;




