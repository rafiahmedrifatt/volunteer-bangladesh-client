import axios from 'axios';
import React from 'react';
import AuthData from './AuthData';


const instance = axios.create({
    baseURL: "https://volunteer-project-server.vercel.app/"
})


const useAxios = () => {
    const { user } = AuthData()
    instance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config
    })
    return instance;
};

export default useAxios;