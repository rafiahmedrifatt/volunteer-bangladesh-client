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
        <div className='grid grid-cols-2 gap-0 w-8/12 mx-auto h-80vh bg-base-200 border-base-300 border h-90vh mt-10'>
            <div>
                <img src="https://i.postimg.cc/bYZR5jNf/austin-kehmeier-lyi-KEx-A4z-QA-unsplash.jpg" className='h-full' alt="" />
            </div>

            <form onSubmit={handleSubmit} className="fieldset my-auto w-10/12 mx-auto">
                <legend className="fieldset-legend text-2xl">Login</legend>

                <label className="label">Email</label>
                <input type="email" className="input w-full" name='email' placeholder="Email" required />

                <label className="label">Password</label>
                <input type="password" className="input w-full" name='password' placeholder="Password" required />

                <div className='mx-auto'>
                    <button type='submit' className="btn btn-neutral mt-4">Login</button>
                </div>
                <p className='text-center mt-5'>Are you new to this website? <Link to='/register' className='border-b-2 border-blue-300'>Register Now</Link></p>
            </form>

        </div>
    );
};

export default Login;