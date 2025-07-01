import React, { useState } from 'react';
import AuthData from '../../hook/AuthData';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const PostModal = ({ singleApplication, index }) => {
    const { thumbnail, postTitle, description, volunteersNeeded, deadline, category, location, _id } = singleApplication;
    const { user } = AuthData();
    const [date, setDate] = useState(deadline);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.target;
        const formData = new FormData(form);
        const formObj = Object.fromEntries(formData);

        // eslint-disable-next-line no-unused-vars
        const { contactPerson, email, volunteersNeeded, ...rest } = formObj;
        rest.deadline = date;
        rest.volunteersNeeded = parseInt(volunteersNeeded);

        axios.patch(`https://volunteer-project-server.vercel.app/updatePosts/${_id}`, rest)
            .then(response => {
                if (response.data.modifiedCount > 0) {
                    document.getElementById(`my_modal_${index}`).close();
                    Swal.fire({
                        title: "Post updated successfully",
                        icon: "success",
                        draggable: true
                    });
                }
            })
            .catch(error => {
                console.error('Update failed:', error);
                Swal.fire({
                    title: "Update failed",
                    text: "Please try again later",
                    icon: "error"
                });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.05
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        }
    };

    const inputVariants = {
        focus: {
            scale: 1.02,
            borderColor: "#0D9488",
            boxShadow: "0 0 0 3px rgba(13, 148, 136, 0.1)"
        },
        blur: {
            scale: 1,
            borderColor: "#E5E7EB"
        }
    };

    return (
        <dialog id={`my_modal_${index}`} className="modal backdrop-blur-sm">
            <motion.div
                className="modal-box max-w-4xl w-full mx-4 bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Header */}
                <motion.div
                    className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white relative overflow-hidden"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="relative z-10">
                        <motion.h1
                            className="text-3xl font-bold text-center flex items-center justify-center gap-3"
                            whileHover={{ scale: 1.02 }}
                        >
                            <motion.svg
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                whileHover={{ rotate: 10 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </motion.svg>
                            Update Volunteer Post
                        </motion.h1>
                        <motion.p
                            className="text-center mt-2 text-white/90"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Modify your volunteer opportunity details
                        </motion.p>
                    </div>
                </motion.div>

                {/* Form Content */}
                <div className="p-8">
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        variants={modalVariants}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Thumbnail */}
                            <motion.div variants={itemVariants} className="lg:col-span-2">
                                <label className="  mb-2 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <motion.svg
                                        className="w-5 h-5 text-teal-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </motion.svg>
                                    Thumbnail URL
                                </label>
                                <motion.input
                                    type="text"
                                    name='thumbnail'
                                    defaultValue={thumbnail}
                                    placeholder='Enter image URL for thumbnail'
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    variants={inputVariants}
                                    whileFocus="focus"
                                    required
                                />
                            </motion.div>

                            {/* Post Title */}
                            <motion.div variants={itemVariants}>
                                <label className="  mb-2 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <motion.svg
                                        className="w-5 h-5 text-teal-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </motion.svg>
                                    Post Title
                                </label>
                                <motion.input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    name='postTitle'
                                    placeholder="Enter compelling post title"
                                    defaultValue={postTitle}
                                    variants={inputVariants}
                                    whileFocus="focus"
                                    required
                                />
                            </motion.div>

                            {/* Category */}
                            <motion.div variants={itemVariants}>
                                <label className="  mb-2 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <motion.svg
                                        className="w-5 h-5 text-teal-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                    </motion.svg>
                                    Category
                                </label>
                                <motion.select
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    name='category'
                                    defaultValue={category}
                                    variants={inputVariants}
                                    whileFocus="focus"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="healthcare">🏥 Healthcare</option>
                                    <option value="education">📚 Education</option>
                                    <option value="social-service">🤝 Social Service</option>
                                    <option value="animal-welfare">🐾 Animal Welfare</option>
                                </motion.select>
                            </motion.div>

                            {/* Description */}
                            <motion.div variants={itemVariants} className="lg:col-span-2">
                                <label className="  mb-2 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <motion.svg
                                        className="w-5 h-5 text-teal-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                    </motion.svg>
                                    Description
                                </label>
                                <motion.textarea
                                    defaultValue={description}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white h-32 resize-none"
                                    placeholder="Describe the volunteer opportunity in detail..."
                                    name='description'
                                    variants={inputVariants}
                                    whileFocus="focus"
                                    required
                                />
                            </motion.div>

                            {/* Location */}
                            <motion.div variants={itemVariants}>
                                <label className="  mb-2 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <motion.svg
                                        className="w-5 h-5 text-teal-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </motion.svg>
                                    Location
                                </label>
                                <motion.input
                                    type="text"
                                    defaultValue={location}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    placeholder="Enter location (city, area)"
                                    name='location'
                                    variants={inputVariants}
                                    whileFocus="focus"
                                    required
                                />
                            </motion.div>

                            {/* Number of Volunteers */}
                            <motion.div variants={itemVariants}>
                                <label className="  mb-2 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <motion.svg
                                        className="w-5 h-5 text-teal-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </motion.svg>
                                    Volunteers Needed
                                </label>
                                <motion.input
                                    type="number"
                                    defaultValue={volunteersNeeded}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    placeholder="How many volunteers?"
                                    name='volunteersNeeded'
                                    min="1"
                                    variants={inputVariants}
                                    whileFocus="focus"
                                    required
                                />
                            </motion.div>

                            {/* Deadline */}
                            <motion.div variants={itemVariants}>
                                <label className="  mb-2 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <motion.svg
                                        className="w-5 h-5 text-teal-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </motion.svg>
                                    Deadline
                                </label>
                                <DatePicker
                                    selected={date}
                                    onChange={(date) => setDate(date)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    placeholderText="Select application deadline"
                                    dateFormat="yyyy/MM/dd"
                                    minDate={new Date()}
                                    required
                                />
                            </motion.div>

                            {/* Organizer Info */}
                            <motion.div variants={itemVariants}>
                                <label className="  mb-2 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <motion.svg
                                        className="w-5 h-5 text-teal-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </motion.svg>
                                    Organizer Name
                                </label>
                                <motion.input
                                    type="text"
                                    value={user.displayName}
                                    name='contactPerson'
                                    readOnly
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label className="  mb-2 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <motion.svg
                                        className="w-5 h-5 text-teal-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </motion.svg>
                                    Organizer Email
                                </label>
                                <motion.input
                                    type="email"
                                    name='email'
                                    value={user.email}
                                    readOnly
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                                />
                            </motion.div>
                        </div>

                        {/* Action Buttons */}
                        <motion.div
                            className="flex gap-4 pt-6 border-t border-gray-100"
                            variants={itemVariants}
                        >
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <AnimatePresence mode="wait">
                                    {isSubmitting ? (
                                        <motion.svg
                                            key="loading"
                                            className="w-5 h-5 animate-spin"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </motion.svg>
                                    ) : (
                                        <motion.svg
                                            key="update"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </motion.svg>
                                    )}
                                </AnimatePresence>
                                {isSubmitting ? 'Updating...' : 'Update Post'}
                            </motion.button>
                        </motion.div>
                    </motion.form>
                </div>
            </motion.div>

            <form method="dialog" className="modal-backdrop bg-black/50 backdrop-blur-sm">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    close
                </motion.button>
            </form>
        </dialog>
    );
};

export default PostModal;