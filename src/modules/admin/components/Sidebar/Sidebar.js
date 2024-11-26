import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faBook, faChartBar, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 
import './Sidebar.css';
import logo from '../../assets/img/logo.png'

const Sidebar = () => {
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const toggleSubmenu = (submenu) => {
        setOpenSubmenu(openSubmenu === submenu ? null : submenu);
    };

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            
            <h2>WISDOM'S BEACON</h2>
            <p>LIBARARY</p>
            <ul>
                <li>
                    <Link to="/">
                        <FontAwesomeIcon icon={faHome} className="icon" />
                        <span>Trang chủ</span>
                    </Link>
                </li>
                <li>
                    <a href="#" onClick={() => toggleSubmenu('books')}>
                        <FontAwesomeIcon icon={faBook} className="icon" />
                        <span>Sách</span>
                        <FontAwesomeIcon 
                            icon={openSubmenu === 'books' ? faChevronUp : faChevronDown} 
                            className="submenu-icon" 
                        />
                    </a>
                    {openSubmenu === 'books' && (
                        <ul className="submenu">
                            <li><Link to="/books">Danh Sách Sách</Link></li>
                            <li><Link to="/stored-borrows">Danh Sách Phiếu Mượn</Link></li>
                        </ul>
                    )}
                </li>
                <li>
                    <a href="#" onClick={() => toggleSubmenu('profile')}>
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <span>Quản Lý</span>
                        <FontAwesomeIcon 
                            icon={openSubmenu === 'profile' ? faChevronUp : faChevronDown} 
                            className="submenu-icon" 
                        />
                    </a>
                    {openSubmenu === 'profile' && (
                        <ul className="submenu">
                            <li><Link to="/employees">Hồ Sơ Nhân Viên</Link></li>
                            <li><Link to="/readers">Hồ Sơ Độc Giả</Link></li>
                        </ul>
                    )}
                </li>
                <li>
                    <a href="#" onClick={() => toggleSubmenu('statistics')}>
                        <FontAwesomeIcon icon={faChartBar} className="icon" />
                        <span>Thống Kê</span>
                        <FontAwesomeIcon 
                            icon={openSubmenu === 'statistics' ? faChevronUp : faChevronDown} 
                            className="submenu-icon" 
                        />
                    </a>
                    {openSubmenu === 'statistics' && (
                        <ul className="submenu">
                            <li><Link to="/statistics">Thống Kê Nhanh</Link></li>
                            <li><Link to="/top-readers">Top Độc Giả</Link></li>
                            <li><Link to="/top-book">Top Sách Yêu Thích</Link></li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
