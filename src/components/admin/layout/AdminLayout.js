import React from 'react';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 fixed top-0 left-0 h-full bg-gray-800 text-white z-50">
                <Sidebar />
            </div>
            <div className="flex-grow ml-64 flex flex-col h-screen">
                {/* Navbar */}
                <div className="h-16 bg-gray-700 fixed top-0 left-0 right-0 z-40 px-5 flex items-center justify-between">
                    <Navbar />
                </div>
                {/* Main content */}
                <div className="mt-16 p-5 overflow-y-auto bg-gray-100 h-[calc(100vh-4rem)]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
