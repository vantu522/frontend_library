import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faUsers, faEnvelope, faChevronDown, faChevronUp, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../../../assets/images/logo.png';

const Sidebar = () => {
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const toggleSubmenu = (submenu) => {
        setOpenSubmenu(openSubmenu === submenu ? null : submenu);
    };

    return (
        <div className="sidebar">
            {/* Logo và tiêu đề */}
            <div className="sidebar-logo">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>WISDOM'S BEACON</h2>
            <p>LIBRARY</p>

            {/* Danh sách menu */}
            <ul>
                {/* Trang chủ */}
                <li>
                    <Link to="/admin">
                        <FontAwesomeIcon icon={faHome} className="icon" />
                        <span>Trang chủ</span>
                    </Link>
                </li>

                {/* Sách */}
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
                            <li><Link to="/admin/books">Danh Sách Sách</Link></li>
                            <li><Link to="/admin/categorylist">Thể Loại</Link></li>
                        </ul>
                    )}
                </li>

                {/* Mượn Trả */}
                <li>
                    <a href="#" onClick={() => toggleSubmenu('borrowing')}>
                        <FontAwesomeIcon icon={faExchangeAlt} className="icon" />
                        <span>Mượn Trả</span>
                        <FontAwesomeIcon
                            icon={openSubmenu === 'borrowing' ? faChevronUp : faChevronDown}
                            className="submenu-icon"
                        />
                    </a>
                    {openSubmenu === 'borrowing' && (
                        <ul className="submenu">
                            <li><Link to="/admin/stored-borrows">Phiếu Mượn</Link></li>
                            <li><Link to="/admin/borrowhistory">Lịch Sử Mượn</Link></li>
                        </ul>
                    )}
                </li>

                {/* Quản lý */}
                <li>
                    <a href="#" onClick={() => toggleSubmenu('management')}>
                        <FontAwesomeIcon icon={faUsers} className="icon" />
                        <span>Quản Lý</span>
                        <FontAwesomeIcon
                            icon={openSubmenu === 'management' ? faChevronUp : faChevronDown}
                            className="submenu-icon"
                        />
                    </a>
                    {openSubmenu === 'management' && (
                        <ul className="submenu">
                            <li><Link to="/admin/employees">Hồ Sơ Nhân Viên</Link></li>
                            <li><Link to="/admin/readers">Hồ Sơ Độc Giả</Link></li>
                        </ul>
                    )}
                </li>

                {/* Phản hồi */}
                <li>
                    <a href="#" onClick={() => toggleSubmenu('feedback')}>
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <span>Phản Hồi</span>
                        <FontAwesomeIcon
                            icon={openSubmenu === 'feedback' ? faChevronUp : faChevronDown}
                            className="submenu-icon"
                        />
                    </a>
                    {openSubmenu === 'feedback' && (
                        <ul className="submenu">
                            <li><Link to="/admin/feedback">Ý Kiến Độc Giả</Link></li>
                            <li><Link to="/admin/archivedfeedback">Lịch Sử Phản Hồi</Link></li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
