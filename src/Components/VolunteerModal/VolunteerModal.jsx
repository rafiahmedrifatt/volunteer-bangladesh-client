/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import AuthData from '../../hook/AuthData';
import Swal from 'sweetalert2';

const VolunteerModal = ({ data, setVolunteersNumber, volunteersNumber }) => {
    const { category, deadline, description, location, organizerInfo, postTitle, thumbnail, _id } = data;
    // const { contactPerson, email, organizationName } = organizerInfo;
    const { user } = AuthData()

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        const formObj = Object.fromEntries(formData.entries())
        const { contactPerson, email, volunteersNeeded, ...rest } = formObj;
        rest.volunteersNeeded = parseInt(volunteersNeeded)
        axios.post('https://volunteer-project-server.vercel.app/volunteer', { rest })
            .then(res => {
                if (res.data.insertedId) {
                    axios.patch(`https://volunteer-project-server.vercel.app/posts/${_id}`).then(() => {
                        setVolunteersNumber(volunteersNumber - 1)
                    }).catch(err => console.log(err))
                }
                Swal.fire({
                    title: "Successfully requested for volunteering! ",
                    icon: "success",
                    draggable: true
                });
                document.getElementById('my_modal_3').close()
            })
            .catch(err => console.log(err))
    }

    return (
        <dialog id="my_modal_3" className="modal backdrop-blur-sm">
            <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100">
                {/* Close Button */}
                <button
                    className="absolute right-4 top-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200 z-10"
                    onClick={() => document.getElementById('my_modal_3').close()}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Volunteer Request</h2>
                            <p className="text-gray-600">Complete the form below to join this volunteer opportunity</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6' method="dialog">
                    {/* Post Information Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-2 mb-4">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-blue-900">Post Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Thumbnail */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Thumbnail</label>
                                <input
                                    type="text"
                                    name='thumbnail'
                                    value={thumbnail}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    readOnly
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                                <input
                                    type="text"
                                    name='category'
                                    className='w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                                    value={category}
                                    readOnly
                                />
                            </div>

                            {/* Post Title */}
                            <div className="md:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Post Title</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    name='postTitle'
                                    value={postTitle}
                                    readOnly
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                    value={description}
                                    name='description'
                                    rows="3"
                                    readOnly
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    name='location'
                                    value={location}
                                    readOnly
                                />
                            </div>

                            {/* Volunteers Needed */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Volunteers Needed</label>
                                <input
                                    type="text"
                                    value={volunteersNumber}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    name='volunteerNeeded'
                                    readOnly
                                />
                            </div>

                            {/* Deadline */}
                            <div className="md:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Deadline</label>
                                <input
                                    name='deadline'
                                    type="text"
                                    value={deadline}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    {/* Organizer Information Section */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                        <div className="flex items-center space-x-2 mb-4">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v11" />
                            </svg>
                            <h3 className="text-lg font-semibold text-green-900">Organizer Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Organization</label>
                                <input
                                    type="text"
                                    name='organizationName'
                                    value={organizerInfo?.organizationName}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Contact Person</label>
                                <input
                                    type="text"
                                    name='organizerName'
                                    value={organizerInfo?.contactPerson}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                    readOnly
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Organizer Email</label>
                                <input
                                    type="text"
                                    name='organizerEmail'
                                    value={organizerInfo?.email}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                        <div className="flex items-center space-x-2 mb-4">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-purple-900">Your Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Your Email</label>
                                <input
                                    name='volunteerEmail'
                                    type="text"
                                    value={user?.email}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Your Name</label>
                                <input
                                    name='volunteerName'
                                    type="text"
                                    value={user?.displayName}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    readOnly
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Suggestions or Comments</label>
                                <textarea
                                    name='Suggestions'
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                                    rows="3"
                                    placeholder="Share any suggestions, questions, or comments about this volunteer opportunity..."
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
                                <div className="relative">
                                    <input
                                        name='Status'
                                        type="text"
                                        value={'requested'}
                                        className="w-full px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 font-medium"
                                        readOnly
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            <span className="flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                <span>Submit Volunteer Request</span>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default VolunteerModal;