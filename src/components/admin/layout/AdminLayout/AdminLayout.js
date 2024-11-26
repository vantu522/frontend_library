import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-main">
                <Navbar />
                <div className="admin-content">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;