import React from 'react';
import { useLoaderData } from 'react-router';
import Card from '../Shared/Card';

const AllPost = () => {
    const posts = useLoaderData()
    return (
        <div className='w-10/12 mx-auto mt-10'>
            <p className='text-3xl text-center my-5'>All Volunteer Needed Posts</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    posts.map(postData => <Card postData={postData} />)
                }
            </div>
        </div>
    );
};

export default AllPost;