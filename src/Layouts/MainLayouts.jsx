import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';

const MainLayouts = () => {
    return (
        <div>
            <Navbar />
            <Outlet />

        </div>
    );
};

export default MainLayouts;