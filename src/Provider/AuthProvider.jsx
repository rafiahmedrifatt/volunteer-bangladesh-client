import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";


const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null);

    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const update = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const logOut = () => {
        return signOut(auth)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false)
        })

        return () => unSubscribe;
    }, [])


    const userData = {
        user,
        signUp,
        signIn,
        logOut,
        update,
        googleSignIn,
        loading
    }
    return (
        <AuthContext value={userData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;