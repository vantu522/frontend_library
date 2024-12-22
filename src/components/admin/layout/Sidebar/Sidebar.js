import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faBook,
    faUsers,
    faEnvelope,
    faChevronDown,
    faChevronUp,
    faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/logo-preview.png';

const Sidebar = () => {
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const toggleSubmenu = (submenu) => {
        setOpenSubmenu(openSubmenu === submenu ? null : submenu);
    };

    return (
        <div className="fixed top-0 left-0 w-64 sm:w-48 md:w-64 h-full bg-gray-800 pt-5 z-10">
            {/* Logo và tiêu đề */}
            <div className="text-center mb-5">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-20 h-auto rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl text-yellow-400">WISDOM'S BEACON</h2>
                <p className="text-lg text-yellow-500">LIBRARY</p>
            </div>

            {/* Danh sách menu */}
            <ul className="space-y-1">
                {/* Trang chủ */}
                <li className="group">
                    <Link
                        to="/admin"
                        className="flex items-center px-5 py-3 text-white hover:bg-gray-600 transition"
                    >
                        <FontAwesomeIcon icon={faHome} className="mr-4 text-xl" />
                        <span>Trang chủ</span>
                    </Link>
                </li>

                {/* Sách */}
                <li className="group">
                    <a
                        href="#"
                        onClick={() => toggleSubmenu('books')}
                        className="flex items-center px-5 py-3 text-white hover:bg-gray-600 transition"
                    >
                        <FontAwesomeIcon icon={faBook} className="mr-4 text-xl" />
                        <span>Sách</span>
                        <FontAwesomeIcon
                            icon={openSubmenu === 'books' ? faChevronUp : faChevronDown}
                            className="ml-auto text-sm"
                        />
                    </a>
                    {openSubmenu === 'books' && (
                        <ul className="bg-gray-700 pl-8 space-y-1">
                            <li>
                                <Link
                                    to="/admin/books"
                                    className="block px-5 py-2 text-gray-300 hover:text-white"
                                >
                                    Danh Sách Sách
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/categorylist"
                                    className="block px-5 py-2 text-gray-300 hover:text-white"
                                >
                                    Thể Loại
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Mượn Trả */}
                <li className="group">
                    <a
                        href="#"
                        onClick={() => toggleSubmenu('borrowing')}
                        className="flex items-center px-5 py-3 text-white hover:bg-gray-600 transition"
                    >
                        <FontAwesomeIcon
                            icon={faExchangeAlt}
                            className="mr-4 text-xl"
                        />
                        <span>Mượn Trả</span>
                        <FontAwesomeIcon
                            icon={openSubmenu === 'borrowing' ? faChevronUp : faChevronDown}
                            className="ml-auto text-sm"
                        />
                    </a>
                    {openSubmenu === 'borrowing' && (
                        <ul className="bg-gray-700 pl-8 space-y-1">
                            <li>
                                <Link
                                    to="/admin/PendingBorrowList"
                                    className="block px-5 py-2 text-gray-300 hover:text-white"
                                >
                                    Phiếu Mượn Đang Chờ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/stored-borrows"
                                    className="block px-5 py-2 text-gray-300 hover:text-white"
                                >
                                    Danh Sách Phiếu Mượn
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/borrowhistory"
                                    className="block px-5 py-2 text-gray-300 hover:text-white"
                                >
                                    Lịch Sử Mượn Đã Trả
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/RenewHistoryList"
                                    className="block px-5 py-2 text-gray-300 hover:text-white"
                                >
                                    Lịch Sử Gia Hạn
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Quản lý */}
                <li className="group">
                    <a
                        href="#"
                        onClick={() => toggleSubmenu('management')}
                        className="flex items-center px-5 py-3 text-white hover:bg-gray-600 transition"
                    >
                        <FontAwesomeIcon icon={faUsers} className="mr-4 text-xl" />
                        <span>Quản Lý</span>
                        <FontAwesomeIcon
                            icon={openSubmenu === 'management' ? faChevronUp : faChevronDown}
                            className="ml-auto text-sm"
                        />
                    </a>
                    {openSubmenu === 'management' && (
                        <ul className="bg-gray-700 pl-8 space-y-1">
                            <li>
                                <Link
                                    to="/admin/readers"
                                    className="block px-5 py-2 text-gray-300 hover:text-white"
                                >
                                    Hồ Sơ Độc Giả
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/postlist"
                                    className="block px-5 py-2 text-gray-300 hover:text-white"
                                >
                                    Bài Đăng
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Phản hồi */}
                <li className="group">
                    <a
                        href="#"
                        onClick={() => toggleSubmenu('feedback')}
                        className="flex items-center px-5 py-3 text-white hover:bg-gray-600 transition"
                    >
                        <FontAwesomeIcon icon={faEnvelope} className="mr-4 text-xl" />
                        <span>Phản Hồi</span>
                        <FontAwesomeIcon
                            icon={openSubmenu === 'feedback' ? faChevronUp : faChevronDown}
                            className="ml-auto text-sm"
                        />
                    </a>
                    {openSubmenu === 'feedback' && (
                        <ul className="bg-gray-700 pl-8 space-y-1">
                            <li>
                                <Link
                                    to="/admin/feedback"
                                    className="block px-5 py-2 text-gray-300 hover:text-white"
                                >
                                    Ý Kiến Độc Giả
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/archivedfeedback"
                                    className="block px-5 py-2 text-gray-300 hover:text-white"
                                >
                                    Lịch Sử Phản Hồi
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
  