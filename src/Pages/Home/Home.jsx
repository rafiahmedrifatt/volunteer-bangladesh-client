import React, { Suspense } from 'react';
import Carousel from './Carousel';
import Posts from './Posts';

const Home = () => {
    const posts = fetch('http://localhost:3000/posts?limit=6').then(res => res.json())
    return (
        <div>
            <Carousel />
            <Suspense fallback={<p>Loading.....</p>}>
                <Posts posts={posts} />
            </Suspense>
        </div>
    );
};

export default Home;