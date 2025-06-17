import React, { Suspense } from 'react';
import Carousel from './Carousel';
import Posts from './Posts';
import { Helmet } from 'react-helmet-async';
import TestimonialsSection from './TestimonialsSection';
import ImpactStories from './ImpactStories';

const Home = () => {
    const posts = fetch('https://volunteer-project-server.vercel.app/posts?limit=6').then(res => res.json())
    return (
        <div>
            <Helmet>
                <title>Home | Volunteer </title>
            </Helmet>
            <Carousel />
            <Suspense fallback={<p>Loading.....</p>}>
                <Posts posts={posts} />
            </Suspense>
            <TestimonialsSection />
            <ImpactStories />
        </div>
    );
};

export default Home;