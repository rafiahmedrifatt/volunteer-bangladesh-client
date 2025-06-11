import React from 'react';
import loader from 'loader.json'

const Loader = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <Lottie animationData={loader} loop={true} />
        </div>
    );
};

export default Loader;
