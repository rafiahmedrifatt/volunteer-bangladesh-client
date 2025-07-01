import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div>
            <p className='text-center p-10'>Copyright © {new Date().getFullYear()} - All right reserved by Bangladesh Volunteer Corporation</p>
        </div>
    );
};

export default Footer;