import React from 'react';
import loading from '../../assets/loader.json'
import Lottie from 'lottie-react';

const Loader = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <Lottie className='w-30' animationData={loading} loop={true} />
        </div>
    );
};

export default Loader;
