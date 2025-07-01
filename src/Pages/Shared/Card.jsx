import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router';

const Card = ({ postData }) => {
    const { thumbnail, category, deadline, postTitle, _id } = postData;
    const formattedDate = format(new Date(deadline), "dd MMMM yyyy")

    return (
        <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
            <div className="relative overflow-hidden">
                <img
                    alt=""
                    src={thumbnail}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-6">
                <div className='flex justify-between items-center mb-4'>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <p className="text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                            {formattedDate}
                        </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border border-teal-200">
                        {category}
                    </span>
                </div>

                <div className='mb-6'>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2 group-hover:text-teal-600 transition-colors duration-200">
                        {postTitle}
                    </h3>
                </div>

                <div className="flex justify-center">
                    <Link
                        to={`/posts/${_id}`}
                        className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-md hover:shadow-lg hover:from-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        <span>View Details</span>
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;