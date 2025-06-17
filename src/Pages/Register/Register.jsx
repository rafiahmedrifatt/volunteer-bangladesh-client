import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import AuthData from '../../hook/AuthData';
import { Helmet } from 'react-helmet-async';

const Register = () => {
    const { signUp, update } = AuthData()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const { email, password, name, photo } = Object.fromEntries(formData.entries())
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        if (!regex.test(password)) {
            setError('Must have an Uppercase letter in the password. Must have a Lowercase letter in the password. Length must be at least 6 character')
            return
        }
        setError('')
        signUp(email, password)
            .then(() => {
                {
                    update(name, photo)
                    navigate('/')
                    Swal.fire({
                        title: "You Have Registered Successfully!",
                        icon: "success",
                        draggable: true
                    });

                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-0 w-8/12 mx-auto h-80vh bg-base-200 border-base-300 border h-90vh mt-10'>
            <Helmet>
                <title>Register | Register Now</title>
            </Helmet>

            <form onSubmit={handleSubmit} className="fieldset my-auto w-10/12 mx-auto">
                <legend className="fieldset-legend text-2xl">Register</legend>

                <label className="label">Name</label>
                <input type="text" className="input w-full" name='name' placeholder="Name" required />

                <label className="label">Email</label>
                <input type="email" className="input w-full" name='email' placeholder="Email" required />

                <label className="label">Photo URL</label>
                <input type="text" className="input w-full" name='photo' placeholder="Photo URL" required />

                <label className="label">Password</label>
                <input type="password" className="input w-full" name='password' placeholder="Password" required />

                <div className='mx-auto'>
                    <button type='submit' className="btn btn-neutral mt-4">Register</button>
                </div>
                <p className='text-center mt-5'>Already Registered? <Link to='/login' className='border-b-2 border-blue-300'>Login Now</Link></p>
                <p className='text-red-500 mt-3'>{error}</p>
            </form>

            <div>
                <img src="https://i.postimg.cc/bYZR5jNf/austin-kehmeier-lyi-KEx-A4z-QA-unsplash.jpg" className='h-full' alt="" />
            </div>
        </div>
    );
};

export default Register;