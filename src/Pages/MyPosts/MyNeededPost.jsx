import React, { useEffect, useState } from 'react';
import AuthContext from '../../Provider/AuthContext';
import AuthData from '../../hook/AuthData';

const MyNeededPost = () => {
    const { user } = AuthData()
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        fetch(`http://localhost:3000/posts?email=${user?.email}`).then(res => res.json()).then(data => setPosts(data))
    }, [])
    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            {
                posts?.map(post =>
                    <li key={post._id} className="list-row">
                        <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
                        <div><img className="size-10 rounded-box" src={post?.thumbnail} /></div>
                        <div className="list-col-grow">
                            <div>Dio Lupa</div>
                            <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
                        </div>
                        <button className="btn btn-square btn-ghost">
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                        </button>
                    </li>
                )
            }
        </ul>
    );
};

export default MyNeededPost;