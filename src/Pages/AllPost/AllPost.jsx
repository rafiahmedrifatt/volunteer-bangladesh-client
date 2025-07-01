import React, { Suspense, useState } from 'react';
import Card from '../Shared/Card';
import { Helmet } from 'react-helmet-async';
import Loader from '../../Components/Loader/Loader';
import GridPosts from './GridPosts';
import ColumnPosts from './ColumnPosts';
import { RiGridFill } from "react-icons/ri";
import { LuListCollapse } from "react-icons/lu";

const AllPost = () => {
    // const [posts, setPosts] = useState(null)
    const [search, setSearch] = useState('')
    const [layout, setLayout] = useState('grid')

    const postPromise = fetch(`https://volunteer-project-server.vercel.app/posts?search=${search}`).then(res => res.json())

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
            <Helmet>
                <title>Posts | See All Posts</title>
            </Helmet>

            {/* Header Section */}
            <div className='text-center mb-10'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
                    All Volunteer Needed Posts
                </h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Discover meaningful volunteer opportunities and make a difference in your community
                </p>
            </div>

            {/* Search and Layout Controls */}
            <div className='bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
                    {/* Search Input */}
                    <div className='col-span-2'>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </g>
                                </svg>
                            </div>
                            <input
                                type="search"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search volunteer opportunities..."
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Layout Toggle */}
                    <div className='flex justify-center md:justify-end'>
                        <div className='flex bg-gray-100 rounded-xl p-1 gap-1'>
                            <button
                                onClick={() => setLayout('grid')}
                                className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${layout === 'grid'
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'text-gray-600 hover:text-blue-500 hover:bg-white'
                                    }`}
                                aria-label="Grid view"
                            >
                                <RiGridFill size={24} />
                            </button>
                            <button
                                onClick={() => setLayout('column')}
                                className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${layout === 'column'
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'text-gray-600 hover:text-blue-500 hover:bg-white'
                                    }`}
                                aria-label="List view"
                            >
                                <LuListCollapse size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts Content */}
            <div className='min-h-screen'>
                {layout === 'grid' ? (
                    <Suspense fallback={
                        <div className='flex justify-center items-center py-20'>
                            <Loader />
                        </div>
                    }>
                        <GridPosts postPromise={postPromise} />
                    </Suspense>
                ) : (
                    <Suspense fallback={
                        <div className='flex justify-center items-center py-20'>
                            <Loader />
                        </div>
                    }>
                        <ColumnPosts postPromise={postPromise} />
                    </Suspense>
                )}
            </div>
        </div>
    );
};

export default AllPost;