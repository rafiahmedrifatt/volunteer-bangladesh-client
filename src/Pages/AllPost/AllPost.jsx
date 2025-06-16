import React, { useEffect, useState } from 'react';
import Card from '../Shared/Card';
import { Helmet } from 'react-helmet-async';

const AllPost = () => {
    const [posts, setPosts] = useState(null)
    const [search, setSearch] = useState('')
    useEffect(() => {
        fetch(`http://localhost:3000/posts?search=${search}`).then(res => res.json()).then(data => setPosts(data))
    }, [search])
    return (
        <div className='w-10/12 mx-auto mt-10'>
            <Helmet>
                <title>Posts | See All Posts</title>
            </Helmet>
            <p className='text-3xl text-center my-5'>All Volunteer Needed Posts</p>
            <label htmlFor="Search">
                <div className="relative w-8/12 h-8 my-5 mx-auto">
                    <input
                        type="text"
                        id="Search"
                        placeholder='Search Your Preferable Work'
                        onChange={(e) => setSearch(e.target.value)}
                        className="mt-0.5 w-full rounded border-gray-300 pe-10 shadow-sm h-full sm:text-sm p-5"
                    />

                    <span className="absolute inset-y-0 right-2 grid w-8 place-content-center p-5 mt-0.5">
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
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                    </span>
                </div>
            </label>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    posts?.map(postData => <Card key={postData._id} postData={postData} />)
                }
            </div>
        </div>
    );
};

export default AllPost;