import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut()
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        })

        return () => unSubscribe;
    }, [])


    const userData = {
        user,
        signUp,
        signIn,
        logOut
    }
    return (
        <AuthContext value={userData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;