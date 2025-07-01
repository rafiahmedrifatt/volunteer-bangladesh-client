import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import AuthData from '../../hook/AuthData';
import { Helmet } from 'react-helmet-async';

const Register = () => {
    const { signUp, update } = AuthData()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const { email, password, name, photo } = Object.fromEntries(formData.entries())
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        if (!regex.test(password)) {
            setError('Must have an Uppercase letter in the password. Must have a Lowercase letter in the password. Length must be at least 6 character')
            return
        }
        setError('')
        signUp(email, password)
            .then(() => {
                {
                    update(name, photo)
                    navigate('/')
                    Swal.fire({
                        title: "You Have Registered Successfully!",
                        icon: "success",
                        draggable: true
                    });

                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg bg-opacity-95">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
                        {/* Form Section */}
                        <div className="flex items-center justify-center p-8 lg:p-12">
                            <div className="w-full max-w-md">
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                                    <p className="text-gray-600">Join us today and start your journey</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Photo URL
                                        </label>
                                        <input
                                            type="text"
                                            name="photo"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                                            placeholder="Enter your photo URL"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                                            placeholder="Create a strong password"
                                            required
                                        />
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm text-red-700">{error}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Create Account
                                    </button>
                                </form>

                                <div className="mt-8 text-center">
                                    <p className="text-gray-600">
                                        Already have an account? {' '}
                                        <Link
                                            to="/login"
                                            className="text-green-500 hover:text-green-600 font-semibold hover:underline transition-colors duration-200"
                                        >
                                            Sign in here
                                        </Link>
                                    </p>
                                </div>

                                <div className="mt-6 text-center">
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        By creating an account, you agree to our Terms of Service and Privacy Policy
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700">
                            <div className="absolute inset-0 bg-opacity-20"></div>
                            <img
                                src="https://i.postimg.cc/bYZR5jNf/austin-kehmeier-lyi-KEx-A4z-QA-unsplash.jpg"
                                className="w-full h-full object-cover"
                                alt="Register background"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-white p-8">
                                    <h2 className="text-4xl font-bold mb-4">Join Our Community!</h2>
                                    <p className="text-lg opacity-90">Create your account and become part of something amazing</p>
                                    <div className="mt-6 flex justify-center space-x-4">
                                        <div className="bg-white bg-opacity-20 rounded-full p-3">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="bg-white bg-opacity-20 rounded-full p-3">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="bg-white bg-opacity-20 rounded-full p-3">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;