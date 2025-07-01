// import { format } from 'date-fns';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import VolunteerModal from '../../Components/VolunteerModal/VolunteerModal';
import { Helmet } from 'react-helmet-async';

const PostDetails = () => {
    const data = useLoaderData()
    const { category, deadline, description, location, postTitle, thumbnail, volunteersNeeded } = data;
    const [volunteersNumber, setVolunteersNumber] = useState(volunteersNeeded)

    return (
        <div className="max-w-4xl mx-auto mt-8 mb-12 px-4">
            <Helmet>
                <title>Post Details | {postTitle}</title>
            </Helmet>

            {/* Main Card Container */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {/* Hero Image */}
                <div className="relative">
                    <img
                        alt=""
                        src={thumbnail}
                        className="h-80 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                        <div className="flex-1">
                            {/* Deadline Badge */}
                            <div className="inline-flex items-center space-x-2 mb-4">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                                    Deadline: {deadline}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
                                {postTitle}
                            </h1>
                        </div>

                        {/* Volunteer Button */}
                        <div className="flex-shrink-0">
                            {volunteersNumber === 0 ? (
                                <button
                                    disabled
                                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    No Spots Available
                                </button>
                            ) : (
                                <button
                                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                    onClick={() => document.getElementById('my_modal_3').showModal()}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                    Become a Volunteer
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Category */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Category</p>
                                    <p className="text-sm font-semibold text-blue-900">{category}</p>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-green-600 uppercase tracking-wide">Location</p>
                                    <p className="text-sm font-semibold text-green-900">{location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Volunteers Needed */}
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-orange-600 uppercase tracking-wide">Volunteers Needed</p>
                                    <p className="text-sm font-semibold text-orange-900">
                                        {volunteersNumber === 0 ? 'Fully Booked' : `${volunteersNumber} spots left`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Description
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-base">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <VolunteerModal
                data={data}
                setVolunteersNumber={setVolunteersNumber}
                volunteersNumber={volunteersNumber}
            />
        </div>
    );
};

export default PostDetails;