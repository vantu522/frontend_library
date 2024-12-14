import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

const UserLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 ">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default UserLayout;
