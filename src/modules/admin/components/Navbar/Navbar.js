
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
    const [dateTime, setDateTime] = useState(new Date());
    const [isMenuOpen, setMenuOpen] = useState(false);
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
        console.log("Đăng xuất");
    };

    const handleChangePassword = () => {
        navigate('/change-password');
    };

    return (
        <div className="navbar">
            <div className="navbar-title">
                <h1>Admin: </h1>
                <p>Chức Vụ: </p>
            </div>
            <div className="navbar-right">
                <span className="date-time">
                    {dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString()}
                </span>
                <FontAwesomeIcon icon={faCog} onClick={toggleMenu} className="settings-icon" />
                {isMenuOpen && (
                    <div className="settings-menu">
                        <button onClick={handleChangePassword}>Đổi mật khẩu</button>
                        <button onClick={handleLogout}>Đăng xuất</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
