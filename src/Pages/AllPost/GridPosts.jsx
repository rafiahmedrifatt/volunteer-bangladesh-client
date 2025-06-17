import React, { use } from 'react';
import Card from '../Shared/Card';

const GridPosts = ({ postPromise }) => {
    const posts = use(postPromise)
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                posts.map(postData => <Card key={postData._id} postData={postData} />)
            }
        </div>
    );
};

export default GridPosts;