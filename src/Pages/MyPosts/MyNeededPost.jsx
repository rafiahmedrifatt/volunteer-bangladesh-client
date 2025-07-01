import React, { useEffect, useState } from 'react';
import AuthData from '../../hook/AuthData';
import { FaArrowRight, FaEdit, FaTrash, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { Link } from 'react-router';
import EmptyProduct from '../../Components/EmptyProduct/EmptyProduct';
import PostModal from '../../Components/PostModal/PostModal';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const MyNeededPost = () => {
    const { user } = AuthData()
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://volunteer-project-server.vercel.app/post?email=${user.email}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setPosts(data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                popup: 'rounded-2xl',
                confirmButton: 'rounded-lg',
                cancelButton: 'rounded-lg'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const filteredUI = posts.filter(post => post._id !== id)
                setPosts(filteredUI)
                axios.delete(`https://volunteer-project-server.vercel.app/posts/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your post has been deleted successfully.",
                            icon: "success",
                            confirmButtonColor: "#10b981",
                            customClass: {
                                popup: 'rounded-2xl',
                                confirmButton: 'rounded-lg'
                            }
                        });
                    }
                })
                    .catch(err => console.log(err))
            }
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            <Helmet>
                <title>My Posts | Volunteer Hub</title>
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Volunteer Posts</h1>
                            <p className="text-gray-600 text-lg">Manage your volunteer opportunity posts</p>
                        </div>
                        <Link
                            to="/applications"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <FaUsers className="mr-2" />
                            View Volunteer Requests
                            <FaArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>

                {/* Empty State */}
                {posts.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="mb-8">
                                <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                    <FaUsers className="text-green-500 text-4xl" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">No Posts Yet</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    You haven't created any volunteer opportunity posts yet. Start making a difference by creating your first post!
                                </p>
                            </div>
                            <Link
                                to='/addVolunteerPosts'
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Create Your First Post
                                <FaArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Posts Grid */
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((singleApplication, index) => (
                            <div key={singleApplication._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                                {/* Post Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={singleApplication.thumbnail}
                                        alt={singleApplication.postTitle}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            #{index + 1}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                                            {singleApplication.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                                        {singleApplication.postTitle}
                                    </h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-gray-600">
                                            <FaMapMarkerAlt className="mr-2 text-green-500" />
                                            <span className="text-sm">{singleApplication.location}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaCalendarAlt className="mr-2 text-green-500" />
                                            <span className="text-sm">Deadline: {singleApplication.deadline}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => document.getElementById(`my_modal_${index}`).showModal()}
                                            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                        >
                                            <FaEdit className="mr-2" />
                                            Update
                                        </button>
                                        <button
                                            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
                                            onClick={() => handleDelete(singleApplication._id)}
                                        >
                                            <FaTrash className="mr-2" />
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                {/* Modal */}
                                <PostModal singleApplication={singleApplication} index={index} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyNeededPost;