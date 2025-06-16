import React from 'react';
import axios from 'axios';
import AuthData from '../../hook/AuthData';

const VolunteerModal = ({ data, setVolunteersNumber, volunteersNumber }) => {
    const { category, deadline, description, location, organizerInfo, postTitle, thumbnail, _id } = data;
    // const { contactPerson, email, organizationName } = organizerInfo;
    const { user } = AuthData()

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        const formObj = Object.fromEntries(formData.entries())
        console.log(formObj);
        axios.post('http://localhost:3000/volunteer', { formObj })
            .then(res => {
                if (res.data.insertedId) {
                    axios.patch(`http://localhost:3000/posts/${_id}`).then(() => {
                        setVolunteersNumber(volunteersNumber - 1)
                    }).catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form onSubmit={handleSubmit} className='space-y-4' method="dialog">
                    {/* Thumbnail */}
                    <div>
                        <label className="block mb-1 font-semibold">Thumbnail</label>
                        <input
                            type="text"
                            name='thumbnail'
                            value={thumbnail}
                            className="w-full px-3 py-2 border rounded-md"
                            readOnly
                        />
                    </div>

                    {/* Post Title */}
                    <div>
                        <label className="block mb-1 font-semibold">Post Title</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            name='postTitle'
                            value={postTitle}
                            placeholder="Enter post title"
                            readOnly
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-semibold">Description</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-md"
                            value={description}
                            name='description'
                            readOnly
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block mb-1 font-semibold">Category</label>
                        <input type="text"
                            name='category'
                            className='w-full px-3 py-2 border rounded-md'
                            value={category}
                            readOnly />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block mb-1 font-semibold">Location</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            name='location'
                            value={location}
                            readOnly
                        />
                    </div>

                    {/* Organizer Info */}
                    <div>
                        <label className="block mb-1 font-semibold">No of Volunteer Needed</label>
                        <input
                            type="text"
                            value={volunteersNumber}
                            className="w-full px-3 py-2 border rounded-md "
                            name='volunteerNeeded'
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">DeadLine</label>
                        <input
                            name='deadline'
                            type="text"
                            value={deadline}
                            className="w-full px-3 py-2 border rounded-md "
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Organizer Company</label>
                        <input
                            type="text"
                            name='organizationName'
                            value={organizerInfo?.organizationName}
                            className="w-full px-3 py-2 border rounded-md "
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Organizer Name</label>
                        <input
                            type="text"
                            name='organizerName'
                            value={organizerInfo?.contactPerson}
                            className="w-full px-3 py-2 border rounded-md "
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Organizer Email</label>

                        <input
                            type="text"
                            name='organizerEmail'
                            value={organizerInfo?.email}
                            className="w-full px-3 py-2 border rounded-md "
                            readOnly
                        />
                    </div>
                    <div className="divider my-5">Personal Info</div>
                    <div>
                        <label className="block mb-1 font-semibold">Volunteer's Email</label>
                        <input
                            name='volunteerEmail'
                            type="text"
                            value={user?.email}
                            className="w-full px-3 py-2 border rounded-md "
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Volunteer's Name</label>
                        <input
                            name='volunteerName'
                            type="text"
                            value={user?.displayName}
                            className="w-full px-3 py-2 border rounded-md "
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Volunteer's Suggestions</label>
                        <input
                            name='Suggestions'
                            type="text"
                            className="w-full px-3 py-2 border rounded-md "
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Status</label>
                        <input
                            name='Status'
                            type="text"
                            value={'requested'}
                            className="w-full px-3 py-2 border rounded-md "
                            readOnly
                        />
                    </div>

                    {/* Add Post Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        >
                            Request
                        </button>
                    </div>
                </form>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
            </div>
        </dialog >
    );
};

export default VolunteerModal;