import React from 'react';
import { useNavigate } from 'react-router';

const MyPosts = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="tabs tabs-box w-full">
                <input onClick={() => navigate('neededPosts')} type="radio" name="my_tabs_1" className="tab w-6/12" aria-label="Tab 1" defaultChecked />
                <input type="radio" name="my_tabs_1" className="tab w-6/12" aria-label="Tab 3" />
            </div>
        </div>
    );
};

export default MyPosts;