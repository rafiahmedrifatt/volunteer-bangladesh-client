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
        <div className='w-10/12 mx-auto mt-10'>
            <Helmet>
                <title>Posts | See All Posts</title>
            </Helmet>
            <p className='text-3xl text-center my-5'>All Volunteer Needed Posts</p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10 items-center'>
                <label className="input col-span-2 w-full">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" onChange={(e) => setSearch(e.target.value)} required placeholder="Search" />
                </label>
                <div className='flex gap-5'>
                    <RiGridFill size={30} className={layout === 'grid' ? 'text-blue-400' : ''} onClick={() => setLayout('grid')} />
                    <LuListCollapse size={30} className={layout === 'column' ? 'text-blue-400' : ''} onClick={() => setLayout('column')} />
                </div>

            </div>
            {
                layout === 'grid' ?
                    <Suspense fallback={<Loader />}>
                        <GridPosts postPromise={postPromise} />
                    </Suspense> :
                    <Suspense fallback={<Loader />}>
                        <ColumnPosts postPromise={postPromise} />
                    </Suspense>

            }
        </div>
    );
};

export default AllPost;