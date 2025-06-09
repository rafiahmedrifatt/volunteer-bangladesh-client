import React from 'react';
import { Outlet, useNavigate } from 'react-router';

const MyPosts = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="tabs tabs-box w-6/12 mx-auto">
                <input onClick={() => navigate('neededPosts')} type="radio" name="my_tabs_1" className="tab w-6/12" aria-label="Your Added Posts" defaultChecked />
                <input onClick={() => navigate('applications')} type="radio" name="my_tabs_1" className="tab w-6/12" aria-label="Your Volunteer Requests" />
            </div>
            <Outlet />
        </div>
    );
};

export default MyPosts;