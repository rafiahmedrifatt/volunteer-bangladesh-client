import { format } from 'date-fns';
import React from 'react';

const Card = ({ postData }) => {
    const { thumbnail, category, deadline, postTitle } = postData;
    const formattedDate = format(new Date(deadline), "dd MMMM yyyy")
    return (
        <div className="block rounded-lg p-4 shadow-xs shadow-indigo-100">
            <img
                alt=""
                src={thumbnail}
                className="h-56 w-full rounded-md object-cover"
            />

            <div className="mt-2">

                <div className='flex justify-between'>
                    <p className="text-sm text-gray-500">{formattedDate}</p>
                    <p className="text-sm text-gray-500">{category}</p>
                </div>

                <div className='mt-3'>
                    <p className="font-medium">{postTitle}</p>
                </div>

                <div className="mt-6 flex justify-center gap-8 text-xs">
                    <a
                        className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                        href="#"
                    >
                        View Details
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Card;