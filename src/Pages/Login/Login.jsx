import React from 'react';
import { Link } from 'react-router';
import AuthData from '../../hook/AuthData';

const Login = () => {
    const { signIn } = AuthData()
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
            <button className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>

        </div>
    );
};

export default Login;