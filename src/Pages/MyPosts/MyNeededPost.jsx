import React, { useEffect, useState } from 'react';
import AuthData from '../../hook/AuthData';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router';
import EmptyProduct from '../../Components/EmptyProduct/EmptyProduct';
import PostModal from '../../Components/PostModal/PostModal';

const MyNeededPost = () => {
    const { user } = AuthData()
    const [posts, setPosts] = useState([]);
    console.log(user);
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/posts?email=${user.email}`)
                .then(res => res.json())
                .then(data => setPosts(data));
        }
    }, [user]);
    return (
        <div className="overflow-x-auto m-5">
            <div className='w-full flex justify-end'>
                <Link to="/applications" className='btn btn-success text-white'>See Your Volunteer Requests <FaArrowRight /></Link>
            </div>
            {
                posts ? <table className="table mt-10">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    No
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Deadline</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts?.map((singleApplication, index) =>
                                <tr key={singleApplication._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={singleApplication.thumbnail}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{singleApplication.postTitle}</div>
                                                <div className="text-sm opacity-50">{singleApplication.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {singleApplication.location}
                                    </td>
                                    <td>{singleApplication.deadline}</td>
                                    <th>
                                        <div className='flex gap-5'>
                                            <button onClick={() => document.getElementById('my_modal_2').showModal()} className="btn btn-success btn-xs text-white">Update</button>
                                            <PostModal singleApplication={singleApplication} />
                                            <button className="btn btn-error btn-xs text-white">Delete</button>
                                        </div>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table> : <div>
                    <EmptyProduct title={'You did not post any volunteer needed posts'} />
                    <button>Add Posts Now</button>

                </div>
            }
            {/* Open the modal using document.getElementById('ID').showModal() method */}
        </div>
    );
};

export default MyNeededPost;