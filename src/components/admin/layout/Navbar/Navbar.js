import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

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
        navigate('/admin/change-password');
    };

    return (
        <div className="fixed top-0 left-64 sm:left-48 md:left-64 w-[1670px] h-16 bg-gray-800 text-white flex justify-between items-center px-5 z-20 shadow-md">
            <div className="flex flex-col items-start space-y-1">
                <h1 className="text-lg mb-0">Admin:</h1>
                <p className="text-sm">Chức Vụ:</p>
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
        </div>
    );
};

export default Navbar;
