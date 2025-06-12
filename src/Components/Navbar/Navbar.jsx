import React from 'react';
import { Link, NavLink } from 'react-router';
import Tippy from '@tippyjs/react';
import AuthData from '../../hook/AuthData';

const Navbar = () => {
    const { user, logOut } = AuthData()

    const links =
        <>
            <li>
                <NavLink className="text-gray-500 transition hover:text-gray-500/75" to="/">Home</NavLink>
            </li>
            <li>
                <NavLink className="text-gray-500 transition hover:text-gray-500/75" to="/posts">Posts</NavLink>
            </li>

            <li>
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
            </li>
            <li>
                <NavLink className="text-gray-500 transition hover:text-gray-500/75" to="/addVolunteerPosts">Add Posts</NavLink>
            </li>
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
    return (
        <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8 shadow">
            <div className="flex h-20 items-center justify-between">
                <div className="flex-1 md:flex md:items-center md:gap-12">
                    <Link to='/' className="block text-teal-600" href="#">
                        <img src="https://img.freepik.com/free-vector/volunteers-group-joining-hand-background-health-charity-camp-vector_1017-48265.jpg?t=st=1749756910~exp=1749760510~hmac=af3de033b93408f7fd85079ff458f29527b3eb674b2f69ac35bb7446fbc6f852&w=2000" className="h-20" alt="" />
                    </Link>
                </div>

                <div className="md:flex md:items-center md:gap-12">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            {links}
                        </ul>
                    </nav>

                    <div className="hidden md:relative md:block">
                        {
                            user?.email || user?.name ? <button
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
                                        className="block rounded-md  px-5 py-2.5 text-sm font-medium bg-teal-600 text-white transition hover:bg-teal-700"
                                        to='/login'
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        className="hidden rounded-md  px-5 py-2.5 text-sm font-medium bg-gray-100 text-teal-600 transition hover:text-teal-600/75 sm:block"
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </div>
                        }

                    </div>

                    <div className="block md:hidden">
                        <button
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;




