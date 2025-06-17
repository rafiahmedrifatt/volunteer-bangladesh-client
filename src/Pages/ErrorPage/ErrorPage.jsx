import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div>
            <Helmet>
                <title>Error | 404</title>
            </Helmet>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
                <img
                    src="https://i.ibb.co/3ZCJ6xC/6325254.jpg"
                    alt="404 Illustration"
                    className="w-full max-w-md mb-8"
                />
                <h1 className="text-5xl font-bold text-gray-800 mb-4">Oops!</h1>
                <p className="text-xl text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;