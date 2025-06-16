import React, { useEffect, useState } from 'react';
import AuthData from '../../hook/AuthData';
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const MyApplications = () => {
    const { user } = AuthData()
    const [applications, setApplications] = useState([])
    console.log(applications);
    useEffect(() => {
        fetch(`http://localhost:3000/myApplication?email=${user?.email}`).then(res => res.json()).then(data => setApplications(data))
    }, [user])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/volunteer/${id}`).then(res => console.log(res)).catch(err => console.log(err))
    }
    return (
        <div className="overflow-x-auto">
            <Helmet>
                <title>Application | My Volunteer Request</title>
            </Helmet>
            <div className='w-full flex justify-start p-5'>
                <Link to="/neededPosts" className='btn btn-success text-white'><FaArrowLeft /> See Your Volunteer Requests </Link>
            </div>
            {
                applications.length === 0 ? <div className='h-[60vh] mt-10 bg-green-100 flex flex-col gap-5 items-center justify-center'>
                    <p className='text-3xl font-bold'>You don't have any volunteer Requests pending</p>
                    <Link to='/addVolunteerPosts' className='btn btn-success text-white'>Become a volunteer</Link>
                </div> : <table className="table">
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
                            applications?.map((singleApplication, index) =>
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
                                        <button className="btn btn-error btn-xs text-white" onClick={() => handleDelete(singleApplication._id)}>Cancel</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }

        </div>
    );
};

export default MyApplications;