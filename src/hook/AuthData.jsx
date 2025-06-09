import React, { use } from 'react';
import AuthContext from '../Provider/AuthContext';

const AuthData = () => {
    const AuthInfo = use(AuthContext)
    return AuthInfo;
};

export default AuthData;