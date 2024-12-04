import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />
            <div className="flex-grow ml-64 flex flex-col h-screen">
                {/* Navbar */}
                <Navbar />
                <div className="mt-16 p-5 overflow-y-auto bg-gray-100 h-[calc(100vh-60px)]">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
