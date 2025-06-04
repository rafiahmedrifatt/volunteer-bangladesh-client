import React, { use } from 'react';
import Card from '../Shared/Card';

const Posts = ({ posts }) => {
    const post = use(posts)
    console.log(post);
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-10/12 mx-auto'>
            {
                post.map(postData => <Card postData={postData} />)
            }
        </div>
    );
};

export default Posts;