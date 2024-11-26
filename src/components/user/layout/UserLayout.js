import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import './UserLayout.css';

const UserLayout = ({ children }) => {
    return (
        <div className="user-layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default UserLayout;