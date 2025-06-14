import React, { useEffect, useState } from 'react';
import AuthData from '../../hook/AuthData';

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

export default MyNeededPost;