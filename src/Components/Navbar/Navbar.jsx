/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import Tippy from '@tippyjs/react';
import AuthData from '../../hook/AuthData';
import { motion } from "framer-motion";

const Navbar = () => {
    const { user, logOut } = AuthData();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.querySelector('html')?.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const commonLinkClasses = "relative text-slate-600 font-medium transition-all duration-300 hover:text-emerald-600 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-teal-500 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full";

    const navLinks = (
        <>
            <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <NavLink className={commonLinkClasses} to="/">Home</NavLink>
            </motion.li>
            <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <NavLink className={commonLinkClasses} to="/posts">Posts</NavLink>
            </motion.li>
            {user && (
                <motion.li
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <button
                        className={`${commonLinkClasses} flex items-center gap-2`}
                        popoverTarget="popover-1"
                        style={{ anchorName: "--anchor-1" }}
                    >
                        My Profile
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <ul
                        className="dropdown menu w-56 rounded-xl bg-white/95 backdrop-blur-lg border border-slate-200/50 shadow-xl shadow-slate-900/10"
                        popover="auto"
                        id="popover-1"
                        style={{ positionAnchor: "--anchor-1" }}
                    >
                        <li>
                            <NavLink
                                className="px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all duration-200"
                                to="/addVolunteerPosts"
                            >
                                Add Volunteer Need Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all duration-200"
                                to="neededPosts"
                            >
                                Manage My Posts
                            </NavLink>
                        </li>
                    </ul>
                </motion.li>
            )}
        </>
    );

    const profileDropdown = (
        <div className="w-64 divide-y divide-slate-100 rounded-2xl border border-slate-200/50 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-900/20" role="menu">
            <div className="p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold">
                        {user?.displayName?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <p className="font-semibold text-slate-800">{user?.displayName}</p>
                        <p className="text-sm text-slate-500">{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`sticky top-0 z-50 mx-auto max-w-screen px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out border-b ${isScrolled
                ? 'bg-white/95 backdrop-blur-xl border-slate-200 shadow-lg shadow-slate-900/10'
                : 'bg-white/80 backdrop-blur-lg border-slate-200/50'
                }`}
        >
            <div className="flex h-20 items-center justify-between">
                {/* Logo */}
                <div className="flex-1 md:flex md:items-center md:gap-12">
                    <Link to="/" className="block">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2"
                        >
                            <img src="./volunteer.png" className='w-auto h-40' alt="" />
                        </motion.div>
                    </Link>
                </div>

                {/* Navigation and Controls */}
                <div className="flex items-center gap-6 md:gap-8">
                    {/* Desktop Nav Links */}
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-8 text-sm">{navLinks}</ul>
                    </nav>

                    {/* Theme Toggle */}
                    <motion.label
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onChange={toggleTheme}
                        className="swap swap-rotate bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-12 h-12 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
                    >
                        <input type="checkbox" className="hidden" />
                        <svg className="swap-on w-6 h-6 fill-amber-500 m-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" />
                        </svg>
                        <svg className="swap-off w-6 h-6 fill-slate-700 m-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27628C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6445 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z" />
                        </svg>
                    </motion.label>

                    {/* Profile / Auth */}
                    <div className="hidden md:relative md:block">
                        {user?.email || user?.name ? (
                            <div className='flex items-center'>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    className="overflow-hidden rounded-full border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-emerald-300"
                                >
                                    <span className="sr-only">Toggle dashboard menu</span>
                                    <Tippy content={profileDropdown} >
                                        <img src={user.photoURL} alt="User" className="w-12 h-12 object-cover" />
                                    </Tippy>
                                </motion.button>
                                <div className="p-2">
                                    <button
                                        onClick={logOut}
                                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 group"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white transition-all duration-300 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl"
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-slate-100 text-emerald-600 transition-all duration-300 hover:bg-slate-200 sm:block shadow-md hover:shadow-lg"
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </motion.div>

                            </div>
                        )}
                    </div>

                    {/* Mobile Dropdown */}
                    <div className="block md:hidden">
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                tabIndex={0}
                                className="rounded-xl bg-slate-100 p-3 text-slate-600 transition-all duration-300 hover:bg-slate-200 shadow-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </motion.button>

                            <ul tabIndex={0} className="dropdown-content menu bg-white/95 backdrop-blur-lg rounded-2xl z-50 w-64 p-4 shadow-2xl shadow-slate-900/20 border border-slate-200/50">
                                {navLinks}
                                {user?.email || user?.name ? (
                                    <div className="mt-4 pt-4 border-t border-slate-200">
                                        <li>
                                            <NavLink
                                                className="px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all duration-200"
                                                to="/addVolunteerPosts"
                                            >
                                                Add Volunteer Need Posts
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all duration-200"
                                                to="neededPosts"
                                            >
                                                Manage My Posts
                                            </NavLink>
                                        </li>
                                        <div className="mt-2 pt-2 border-t border-slate-200">
                                            <button
                                                onClick={logOut}
                                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                                </svg>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-200">
                                        <Link
                                            className="px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white transition-all duration-300 hover:from-emerald-700 hover:to-teal-700 text-center"
                                            to="/login"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            className="px-6 py-3 text-sm font-semibold rounded-xl bg-slate-100 text-emerald-600 transition-all duration-300 hover:bg-slate-200 text-center"
                                            to="/register"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;