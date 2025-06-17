import React, { useEffect, useState } from 'react';
import AuthData from '../../hook/AuthData';
import { FaArrowRight } from "react-icons/fa";
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
            fetch(`http://localhost:3000/post?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => setPosts(data));
        }
    }, [user]);
    console.log(posts);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const filteredUI = posts.filter(post => post._id !== id)
                setPosts(filteredUI)
                axios.delete(`http://localhost:3000/posts/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }

                })
                    .catch(err => console.log(err))

            }
        });

    }

    return (
        <div className="overflow-x-auto m-5">
            <Helmet>
                <title>My Posts | All</title>
            </Helmet>
            <div className='w-full flex justify-end'>
                <Link to="/applications" className='btn btn-success text-white'>See Your Volunteer Requests <FaArrowRight /></Link>
            </div>
            {
                posts.length === 0 ? <div className='h-[60vh] mt-10 bg-green-100 flex flex-col gap-5 items-center justify-center'>
                    <p className='text-3xl font-bold'>You dont have any volunteer needed posts</p>
                    <Link to='/addVolunteerPosts' className='btn btn-success text-white'>Add Posts Now</Link>
                </div> : <table className="table mt-10">
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
                            posts.map((singleApplication, index) =>
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
                                            <button onClick={() => document.getElementById(`my_modal_${index}`).showModal()} className="btn btn-success btn-xs text-white">Update</button>
                                            <PostModal singleApplication={singleApplication} index={index} />
                                            <button className="btn btn-error btn-xs text-white" onClick={() => handleDelete(singleApplication._id)}>Delete</button>
                                        </div>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }
            {/* Open the modal using document.getElementById('ID').showModal() method */}
        </div>
    );
};

export default MyNeededPost;