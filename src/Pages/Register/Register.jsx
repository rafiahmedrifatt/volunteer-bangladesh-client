import React, { use } from 'react';
import { Link } from 'react-router';
import AuthContext from '../../Provider/AuthContext';

const Register = () => {
    const { signUp, user } = use(AuthContext)

    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const { email, password } = Object.fromEntries(formData.entries())
        signUp(email, password)
            .then((result) => console.log(result)).catch(err => console.log(err))
    }

    console.log(user);


    return (
        <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
            <legend className="fieldset-legend">Register</legend>

            <label className="label">Name</label>
            <input type="text" className="input" name='name' placeholder="Name" required />

            <label className="label">Email</label>
            <input type="email" className="input" name='email' placeholder="Email" required />

            <label className="label">Photo URL</label>
            <input type="text" className="input" name='photo' placeholder="Photo URL" required />

            <label className="label">Password</label>
            <input type="password" className="input" name='password' placeholder="Password" required />

            <button type='submit' className="btn btn-neutral mt-4">Register</button>
            <p>Already Registered? <Link to='/login'>Login Now</Link></p>
        </form>
    );
};

export default Register;