import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const router = useRouter()
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/events')
        }
    }, [router])


    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = credentials
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const response = await res.json()
        if (response.success) {
            toast.success(response.message,{
                position: "top-left",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            setTimeout(() => {
                router.push('/login')
            }, 1500)
        }
        else {
            toast.error(response.error,{
                position: "top-left",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
}


return (
    <div className='flex justify-center w-fit mx-auto items-center h-screen'>
        <div className='flex flex-col space-y-5 items-center'>

            <h1 className='text-4xl font-bold'>Create a new Account</h1>

            <form className='flex flex-col space-y-4 w-64 items-center'>
                <input name='name' onChange={handleChange} value={credentials.name} type="text" placeholder='Name' className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
                <input name='email' onChange={handleChange} value={credentials.email} type="email" placeholder='Email' className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
                <input name='password' onChange={handleChange} value={credentials.password} type="password" placeholder='Password' className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
                <button type="submit" onClick={handleSubmit} className='bg-[#28b498] text-white p-2 rounded-md w-1/2'>Signup</button>
            </form>
            <p>Already have an account? <span onClick={() => router.push('/login')} className='text-[#28b498] font-bold hover:underline hover:cursor-pointer'>Login</span></p>
        </div>
    </div>
)
}

export default Signup
