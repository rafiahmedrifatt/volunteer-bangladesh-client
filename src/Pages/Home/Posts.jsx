import React, { use } from 'react';
import Card from '../Shared/Card';
import { Link } from 'react-router';

const Posts = ({ posts }) => {
    const post = use(posts)
    return (
        <div className='mt-5'>
            <p className='text-3xl text-center font-medium mb-10'>Volunteer In Needs</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-10/12 mx-auto'>
                {
                    post.map(postData => <Card postData={postData} />)
                }
            </div>
            <div className='text-center'>
                <Link to="/posts" className='btn btn-accent w-50 my-10'>See More</Link>
            </div>
        </div>
    );
};

export default Posts;