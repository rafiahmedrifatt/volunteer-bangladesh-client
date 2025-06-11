import React from 'react';
import Loader from '../Components/Loader/Loader';
import { Navigate } from 'react-router';
import AuthData from '../hook/AuthData';

const PrivateRoute = ({ children }) => {
    const { user, loading } = AuthData()
    if (loading) {
        return Loader;
    }
    if (user && user.email) {
        return <div>{children}</div>
    } else {
        <Navigate to='/login'> </Navigate>
    }
};

export default PrivateRoute;