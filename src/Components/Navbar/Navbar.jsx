import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import Tippy from '@tippyjs/react';
import AuthData from '../../hook/AuthData';
import { motion } from "framer-motion"

const Navbar = () => {
    const { user, logOut } = AuthData()
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const links =
        <>
            <motion.li initial={{ scale: 0 }} animate={{ scale: 1 }}
                whileTap={{ scale: 0.8 }}
            >
                <NavLink className="text-gray-500 transition hover:text-gray-500/75" to="/">Home</NavLink>
            </motion.li>
            <motion.li initial={{ scale: 0 }} animate={{ scale: 1 }}
                whileTap={{ scale: 0.8 }}>
                <NavLink className="text-gray-500 transition hover:text-gray-500/75" to="/posts">Posts</NavLink>
            </motion.li>

            {user ? <motion.li initial={{ scale: 0 }} animate={{ scale: 1 }}
                whileTap={{ scale: 0.8 }}>
                <button className="text-gray-500 transition hover:text-gray-500/75" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}>
                    My profile
                </button>

                <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                    popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */}>
                    <li>
                        <NavLink className="text-gray-500 transition hover:text-gray-500/75" to="/addVolunteerPosts">Add Volunteer Need Posts</NavLink>
                    </li>
                    <li><NavLink className="text-gray-500 transition hover:text-gray-500/75" to='neededPosts'>Manage My Posts</NavLink></li>
                </ul>
            </motion.li> : ""}
        </>

    const hoveredContent = <div
        className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
        role="menu"
    >
        <div className="p-2 text-left">
            {user?.displayName}
        </div>

        <div className="p-2">
            <button
                onClick={() => logOut()}
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                </svg>

                Logout
            </button>
        </div>
    </div>
    return (
        <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8 shadow">
            <div className="flex h-20 items-center justify-between">
                <div className="flex-1 md:flex md:items-center md:gap-12">
                    <Link to='/' className="block text-teal-600" href="#">
                        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }}
                            whileTap={{ scale: 0.8 }} className='text-2xl font-bold text-green-500'>Volunteer Bangladesh</motion.p>
                    </Link>
                </div>

                <div className="flex md:items-center gap-5 md:gap-12">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            {links}
                        </ul>
                    </nav>
                    <label onChange={toggleTheme} className="swap swap-rotate bg-gray-200 rounded-full w-10">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" />

                        {/* sun icon */}
                        <svg
                            className="swap-on h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-off h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>

                    <div className="hidden md:relative md:block">
                        {
                            user?.email || user?.name ? <button initial={{ scale: 0 }} animate={{ scale: 1 }}
                                whileTap={{ scale: 0.8 }}
                                type="button"
                                className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                            >
                                <span className="sr-only">Toggle dashboard menu</span>

                                <Tippy content={hoveredContent} placement='left' interactive={true} interactiveBorder={20} className='bg-white shadow p-3'>
                                    <img
                                        src={user.photoURL}
                                        alt=""
                                        className="size-10 object-cover"
                                    />
                                </Tippy>
                            </button> :
                                <div className="sm:flex sm:gap-4">
                                    <Link
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        whileTap={{ scale: 0.8 }}
                                        className="block rounded-md  px-5 py-2.5 text-sm font-medium bg-teal-600 text-white transition hover:bg-teal-700"
                                        to='/login'
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        whileTap={{ scale: 0.8 }}
                                        className="hidden rounded-md  px-5 py-2.5 text-sm font-medium bg-gray-100 text-teal-600 transition hover:text-teal-600/75 sm:block"
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </div>
                        }

                    </div>

                    <div className="block md:hidden">
                        <div className="dropdown dropdown-bottom dropdown-end">

                            <button tabIndex={0} role="button"
                                className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                {
                                    links
                                }
                                {
                                    user?.email || user?.name ? <button
                                        type="button"
                                        className="overflow-hidden border border-gray-300 shadow-inner"
                                    >
                                        <li>
                                            <NavLink className="text-gray-500 transition hover:text-gray-500/75" to="/addVolunteerPosts">Add Volunteer Need Posts</NavLink>
                                        </li>
                                        <li><NavLink className="text-gray-500 transition hover:text-gray-500/75" to='neededPosts'>Manage My Posts</NavLink></li>
                                        <div>

                                            <div className="p-2">
                                                <button
                                                    onClick={() => logOut()}
                                                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                    role="menuitem"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="size-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                                        />
                                                    </svg>

                                                    Logout
                                                </button>
                                            </div>
                                        </div>

                                    </button> :
                                        <div className="flex flex-col gap-2">
                                            <Link
                                                initial={{ scale: 0 }} animate={{ scale: 1 }} className="block rounded-md  px-5 py-2.5 text-sm font-medium bg-teal-600 text-white transition hover:bg-teal-700"
                                                to='/login'
                                            >
                                                Login
                                            </Link>

                                            <Link
                                                className=" rounded-md  px-5 py-2.5 text-sm font-medium bg-gray-100 text-teal-600 transition hover:text-teal-600/75 sm:block"
                                                to="/register"
                                            >
                                                Register
                                            </Link>
                                        </div>
                                }
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;




