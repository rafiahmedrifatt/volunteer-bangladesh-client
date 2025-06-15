import React, { useState } from 'react';
import AuthData from '../../hook/AuthData';
import DatePicker from 'react-datepicker';
import axios from 'axios';

const PostModal = ({ singleApplication }) => {
    console.log(singleApplication);
    const { thumbnail, postTitle, description, volunteersNeeded, deadline, category, _id } = singleApplication;
    const { user } = AuthData()
    const [date, setDate] = useState(deadline)
    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        const formObj = Object.fromEntries(formData);
        const { contactPerson, email, ...rest } = formObj;
        console.log(contactPerson, email);
        rest.deadline = date
        axios.patch(`http://localhost:3000/updatePosts/${_id}`, rest).then(response => {
            console.log('Update successful:', response.data);
        }).catch(error => {
            console.error('Update failed:', error);
        });
    }
    return (
        <dialog id="my_modal_2" className="modal p-10">
            <div className="modal-box m-10">
                <div className="max-w-xl mx-auto p-6 rounded-lg mt-10">
                    <h1 className="text-2xl font-bold mb-6 text-center">Add Volunteer Need Post</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Thumbnail */}
                        <div>
                            <label className="block mb-1 font-semibold">Thumbnail</label>
                            <input
                                type="text"
                                name='thumbnail'
                                defaultValue={thumbnail}
                                placeholder='Thumbnail'
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>

                        {/* Post Title */}
                        <div>
                            <label className="block mb-1 font-semibold">Post Title</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md"
                                name='postTitle'
                                placeholder="Enter post title"
                                defaultValue={postTitle}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-1 font-semibold">Description</label>
                            <textarea
                                defaultValue={description}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Describe the volunteer need"
                                name='description'
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block mb-1 font-semibold">Category</label>
                            <select
                                className="w-full px-3 py-2 border rounded-md"
                                name='category'
                                defaultValue={category}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="education">Education</option>
                                <option value="social-service">Social Service</option>
                                <option value="animal-welfare">Animal Welfare</option>
                            </select>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block mb-1 font-semibold">Location</label>
                            <input
                                type="text"
                                defaultValue={location}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter location"
                                name='location'
                                required
                            />
                        </div>

                        {/* Number of Volunteers Needed */}
                        <div>
                            <label className="block mb-1 font-semibold">No. of Volunteers Needed</label>
                            <input
                                type="number"
                                defaultValue={volunteersNeeded}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Number of volunteers"
                                name='volunteersNeeded'
                                required
                            />
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="block mb-1 font-semibold">Deadline</label>
                            <DatePicker
                                selected={deadline}
                                onChange={(date) => setDate(date)}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholderText="Select deadline"
                                dateFormat="yyyy/MM/dd"
                                required
                            />
                        </div>


                        <div>
                            <label className="block mb-1 font-semibold">Organizer Name</label>
                            <input
                                type="text"
                                value={user.displayName}
                                name='contactPerson'
                                readOnly
                                className="w-full px-3 py-2 border rounded-md "
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Organizer Email</label>
                            <input
                                type="email"
                                name='email'
                                value={user.email}
                                readOnly
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>

                        {/* Add Post Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default PostModal;