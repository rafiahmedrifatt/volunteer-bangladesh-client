import React from 'react';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    return (
        <div>
            <Helmet>
                <title>Error | 404</title>
            </Helmet>
            <h1>error</h1>
        </div>
    );
};

export default ErrorPage;