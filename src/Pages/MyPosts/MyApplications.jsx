import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AuthData from '../../hook/AuthData';

const MyApplications = () => {
    const { user } = AuthData()
    const [application, setApplication] = useState()
    useEffect(() => {
        axios.get(`http://localhost:3000/posts?email=${user?.email}`).then(res => setApplication(res.data))
    }, [])
    console.log(application);
    return (
        <div className="overflow-x-auto">
            <table className="table">
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
                        application?.map((singleApplication, index) =>
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
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyApplications;