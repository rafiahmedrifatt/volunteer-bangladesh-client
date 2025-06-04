import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';

const MainLayouts = () => {
    return (
        <div>
            <Navbar />
            <div className='min-h-screen'>
                <Outlet />
            </div>
            <Footer />

        </div>
    );
};

export default MainLayouts;