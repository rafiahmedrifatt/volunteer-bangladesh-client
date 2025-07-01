import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import AuthData from '../../hook/AuthData';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { signIn, googleSignIn } = AuthData()

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password).then(() => navigate(location.state?.from || '/')).catch(() => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Incorrect Email or Password!",
            });
        })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => navigate(location.state ? location.state : '/'))
            .catch(err => console.log(err))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg bg-opacity-95">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                        {/* Image Section */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700">
                            <div className="absolute inset-0 bg-opacity-20"></div>
                            <img
                                src="https://i.postimg.cc/bYZR5jNf/austin-kehmeier-lyi-KEx-A4z-QA-unsplash.jpg"
                                className="w-full h-full object-cover"
                                alt="Login background"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-white p-8">
                                    <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                                    <p className="text-lg opacity-90">Sign in to continue your journey with us</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="flex items-center justify-center p-8 lg:p-12">
                            <div className="w-full max-w-md">
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
                                    <p className="text-gray-600">Enter your credentials to access your account</p>
                                </div>

                                <div onSubmit={handleSubmit} className="space-y-6">
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
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Sign In
                                    </button>
                                </div>

                                <div className="mt-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleGoogleSignIn}
                                        className="w-full mt-4 flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-3"
                                            aria-label="Google logo"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <g>
                                                <path d="m0 0H512V512H0" fill="#fff"></path>
                                                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                            </g>
                                        </svg>
                                        <span className="text-gray-700 font-medium">Continue with Google</span>
                                    </button>
                                </div>

                                <div className="mt-8 text-center">
                                    <p className="text-gray-600">
                                        New to our platform? {' '}
                                        <Link
                                            to="/register"
                                            className="text-green-500 hover:text-green-600 font-semibold hover:underline transition-colors duration-200"
                                        >
                                            Create an account
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;