import React, { use } from 'react';
import { Link } from 'react-router';
import AuthContext from '../../Provider/AuthContext';

const Login = () => {
    const { signIn } = use(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password).then(res => console.log(res)).then(err => console.log(err))
    }
    return (
        <form onSubmit={handleSubmit} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input type="email" name='email' className="input" placeholder="Email" />

            <label className="label">Password</label>
            <input type="password" name='password' className="input" placeholder="Password" />

            <button type="submit" className="btn btn-neutral mt-4">Login</button>
            <p>Not have an account? <Link to="/register">Register Now</Link></p>
        </form>
    );
};

export default Login;