import React, { use } from 'react';
import { Link } from 'react-router';

const ColumnPosts = ({ postPromise }) => {
    const posts = use(postPromise)
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                <tbody>
                    {
                        posts.map((post, index) => <tr key={post._id}>
                            <th>{index + 1}</th>
                            <td>{post.postTitle}</td>
                            <td>{post.category}</td>
                            <td>{post.deadline}</td>
                            <Link className='btn btn-success text-white' to={`/posts/${post._id}`}>Details</Link>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ColumnPosts;