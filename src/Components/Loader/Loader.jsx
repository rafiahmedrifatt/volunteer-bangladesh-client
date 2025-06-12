import React from 'react';
import loading from '../../assets/loader.json'

const Loader = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <Lottie animationData={loading} loop={true} />
        </div>
    );
};

export default Loader;
