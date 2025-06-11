import React from 'react';
import { Outlet } from 'react-router';

const MyPosts = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default MyPosts;