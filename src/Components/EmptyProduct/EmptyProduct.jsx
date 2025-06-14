import React from 'react';

const EmptyProduct = (title) => {
    return (
        <div className='flex justify-center items-center h-[70vh]'>
            <h1>{title}</h1>
        </div>
    );
};

export default EmptyProduct;