/* eslint-disable no-unused-vars */
import axios from 'axios';
import { format } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AuthData from '../../hook/AuthData';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

const AddVolunteer = () => {
    const { user } = AuthData()
    const [deadline, setDeadline] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true);

        const form = e.target
        const formData = new FormData(form)
        const { organizationName, contactPerson, email, volunteersNeeded, ...data } = Object.fromEntries(formData)
        data.organizerInfo = { organizationName, contactPerson, email }
        data.volunteersNeeded = parseInt(volunteersNeeded)

        const formattedDate = format(deadline, 'yyyy-MM-dd')
        data.deadline = formattedDate;

        try {
            const res = await axios.post('https://volunteer-project-server.vercel.app/posts', { data }, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });

            if (res.data.insertedId) {
                Swal.fire({
                    title: "Post Added Successfully!",
                    icon: "success",
                    draggable: true
                });
                e.target.reset()
                setDeadline(null);
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to add post. Please try again.",
                icon: "error"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
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
                stiffness: 300,
                damping: 25
            }
        }
    };

    const formFields = [
        {
            name: 'thumbnail',
            label: 'Thumbnail URL',
            type: 'text',
            placeholder: 'Enter image URL for thumbnail',
            icon: '🖼️'
        },
        {
            name: 'postTitle',
            label: 'Post Title',
            type: 'text',
            placeholder: 'Enter an engaging post title',
            icon: '📝'
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Describe the volunteer opportunity in detail...',
            icon: '📄'
        },
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            options: [
                { value: '', label: 'Select Category' },
                { value: 'healthcare', label: 'Healthcare' },
                { value: 'education', label: 'Education' },
                { value: 'social-service', label: 'Social Service' },
                { value: 'animal-welfare', label: 'Animal Welfare' }
            ],
            icon: '🏷️'
        },
        {
            name: 'location',
            label: 'Location',
            type: 'text',
            placeholder: 'Enter event location',
            icon: '📍'
        },
        {
            name: 'volunteersNeeded',
            label: 'Number of Volunteers Needed',
            type: 'number',
            placeholder: 'How many volunteers do you need?',
            icon: '👥'
        }
    ];

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <Helmet>
                <title>Add Volunteer Post | Add Now</title>
            </Helmet>

            <motion.div
                className="max-w-2xl mx-auto"
                variants={itemVariants}
            >
                <motion.div
                    className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Header */}
                    <motion.div
                        className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 p-8 text-center"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <motion.h1
                            className="text-3xl font-bold text-white mb-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                        >
                            Create Volunteer Opportunity
                        </motion.h1>
                        <motion.p
                            className="text-blue-100"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            Help build a better community by posting volunteer needs
                        </motion.p>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        className="p-8"
                        variants={containerVariants}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {formFields.map((field) => (
                                <motion.div
                                    key={field.name}
                                    variants={itemVariants}
                                    className="group"
                                >
                                    <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700">
                                        <span className="text-lg">{field.icon}</span>
                                        {field.label}
                                    </label>

                                    {field.type === 'textarea' ? (
                                        <motion.textarea
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none h-32 bg-gray-50/50"
                                            required
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    ) : field.type === 'select' ? (
                                        <motion.select
                                            name={field.name}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50/50"
                                            required
                                            whileFocus={{ scale: 1.02 }}
                                        >
                                            {field.options.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </motion.select>
                                    ) : (
                                        <motion.input
                                            type={field.type}
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50/50"
                                            required
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    )}
                                </motion.div>
                            ))}

                            {/* Deadline */}
                            <motion.div variants={itemVariants} className="group">
                                <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700">
                                    <span className="text-lg">📅</span>
                                    Deadline
                                </label>
                                <motion.div whileFocus={{ scale: 1.02 }}>
                                    <DatePicker
                                        selected={deadline}
                                        onChange={(date) => setDeadline(date)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-gray-50/50"
                                        placeholderText="Select deadline date"
                                        dateFormat="yyyy/MM/dd"
                                        minDate={new Date()}
                                        required
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Organizer Info */}
                            <motion.div
                                className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-2 border-gray-100"
                                variants={itemVariants}
                            >
                                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                    <span className="text-xl">👤</span>
                                    Organizer Information
                                </h3>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-600">
                                            Organizer Name
                                        </label>
                                        <motion.input
                                            type="text"
                                            value={user.displayName}
                                            name='contactPerson'
                                            readOnly
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                                            whileHover={{ scale: 1.01 }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium text-gray-600">
                                            Organizer Email
                                        </label>
                                        <motion.input
                                            type="email"
                                            name='email'
                                            value={user.email}
                                            readOnly
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                                            whileHover={{ scale: 1.01 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                variants={itemVariants}
                                className="pt-4"
                            >
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <AnimatePresence mode="wait">
                                        {isSubmitting ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center justify-center gap-3"
                                            >
                                                <motion.div
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                Creating Post...
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="submit"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <span className="text-xl">🚀</span>
                                                Create Volunteer Post
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Animated background */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-blue-700 via-teal-700 to-green-700 opacity-0"
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>

                {/* Success Animation Placeholder */}
                <AnimatePresence>
                    {/* This could be expanded for custom success animations */}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default AddVolunteer;