import axios from 'axios';
import { format } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AuthData from '../../hook/AuthData';

const AddVolunteer = () => {
    const { user } = AuthData()

    const [deadline, setDeadline] = useState(null);
    console.log(deadline);

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const { organizationName, contactPerson, email, ...data } = Object.fromEntries(formData)
        data.organizerInfo = { organizationName, contactPerson, email }


        const formattedDate = format(deadline, 'yyyy-MM-dd')
        data.deadline = formattedDate;

        console.log(data);

        axios.post('http://localhost:3000/posts', { data }).then(res => console.log(res))
    };

    return (
        <div className="max-w-xl mx-auto p-6 rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Add Volunteer Need Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Thumbnail */}
                <div>
                    <label className="block mb-1 font-semibold">Thumbnail</label>
                    <input
                        type="text"
                        name='thumbnail'
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
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-semibold">Description</label>
                    <textarea
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
                        onChange={(date) => setDeadline(date)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholderText="Select deadline"
                        dateFormat="yyyy/MM/dd"
                        required
                    />
                </div>

                {/* Organizer Info */}
                <div>
                    <label className="block mb-1 font-semibold">Organization</label>
                    <input
                        type="text"
                        name='organizationName'
                        className="w-full px-3 py-2 border rounded-md "
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Organizer Name</label>
                    <input
                        type="text"
                        value={user.name}
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
                        Add Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddVolunteer;
