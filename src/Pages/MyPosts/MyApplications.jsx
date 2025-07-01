import React, { useEffect, useState } from 'react';
import AuthData from '../../hook/AuthData';
import { Link } from 'react-router';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaTrash, FaEye, FaFilter, FaSearch } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const MyApplications = () => {
    const { user } = AuthData();
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        fetchApplications();
    }, [user]);

    useEffect(() => {
        filterAndSortApplications();
    }, [applications, searchTerm, filterCategory, sortBy]);

    const fetchApplications = async () => {
        try {
            const response = await fetch(`https://volunteer-project-server.vercel.app/myApplication?email=${user?.email}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to load applications. Please try again.',
                icon: 'error'
            });
        }
    };

    const filterAndSortApplications = () => {
        let filtered = applications.filter(app => {
            const matchesSearch = app.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === 'all' || app.category === filterCategory;
            return matchesSearch && matchesCategory;
        });

        // Sort applications
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.deadline) - new Date(a.deadline);
                case 'oldest':
                    return new Date(a.deadline) - new Date(b.deadline);
                case 'alphabetical':
                    return a.postTitle.localeCompare(b.postTitle);
                default:
                    return 0;
            }
        });

        setFilteredApplications(filtered);
    };

    const handleDelete = (id, title) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You're about to cancel your application for "${title}". This action cannot be undone!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "Keep application"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://volunteer-project-server.vercel.app/volunteer/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                })
                    .then(res => res.json())
                    .then((data) => {
                        const filteredUI = applications.filter(application => application._id !== id);
                        setApplications(filteredUI);

                        Swal.fire({
                            title: "Cancelled!",
                            text: "Your volunteer application has been cancelled.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to cancel application. Please try again.',
                            icon: 'error'
                        });
                    });
            }
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

        if (daysUntilDeadline < 0) return 'bg-red-100 text-red-800';
        if (daysUntilDeadline <= 3) return 'bg-orange-100 text-orange-800';
        if (daysUntilDeadline <= 7) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    const getUniqueCategories = () => {
        const categories = [...new Set(applications.map(app => app.category))];
        return categories;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            <Helmet>
                <title>My Applications | Volunteer Hub</title>
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm mb-8">
                    <div className="px-6 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">My Volunteer Applications</h1>
                                <p className="mt-2 text-gray-600">Track and manage your volunteer requests</p>
                            </div>
                            <Link
                                to="/neededPosts"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <FaArrowLeft className="mr-2" />
                                View Volunteer Requests
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {applications.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                                <FaEye className="text-3xl text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Applications Yet</h3>
                            <p className="text-gray-600 mb-8">
                                You haven't applied for any volunteer opportunities yet. Start making a difference today!
                            </p>
                            <Link
                                to='/posts'
                                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm font-medium"
                            >
                                Explore Opportunities
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Filters and Search */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Search */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search by title or location..."
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div className="relative min-w-[200px]">
                                    <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                                    <select
                                        className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white transition-colors"
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                    >
                                        <option value="all">All Categories</option>
                                        {getUniqueCategories().map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort */}
                                <div className="min-w-[160px]">
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="alphabetical">A-Z</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Showing {filteredApplications.length} of {applications.length} applications
                                </div>
                            </div>
                        </div>

                        {/* Applications Grid */}
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {filteredApplications.map((application, index) => (
                                <div key={application._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                    <div className="relative">
                                        <img
                                            src={application.thumbnail}
                                            alt={application.postTitle}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.deadline)}`}>
                                            {new Date(application.deadline) < new Date() ? 'Expired' : 'Active'}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="mb-3">
                                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                {application.category}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                                            {application.postTitle}
                                        </h3>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0" />
                                                <span className="truncate">{application.location}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <FaCalendarAlt className="mr-2 text-gray-400 flex-shrink-0" />
                                                <span>Deadline: {formatDate(application.deadline)}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleDelete(application._id, application.postTitle)}
                                                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                                            >
                                                <FaTrash className="mr-2" />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Results State */}
                        {filteredApplications.length === 0 && applications.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                                <div className="max-w-md mx-auto">
                                    <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                                        <FaSearch className="text-3xl text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">No Results Found</h3>
                                    <p className="text-gray-600 mb-6">
                                        Try adjusting your search terms or filters to find what you're looking for.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchTerm('');
                                            setFilterCategory('all');
                                        }}
                                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyApplications;