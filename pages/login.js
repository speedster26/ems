import React , { useState , useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({checkAdmin}) => {
  const router = useRouter()
  const [credentials, setCredentials] = useState({email:'',password:''})
  useEffect(() => {
    if(localStorage.getItem('token')){
      // router.push('/events')
    }
  }, [router])
  

  const handleChange = (e) => {
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email:credentials.email, password:credentials.password };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    let response = await res.json()
    setCredentials({email:'',password:''})
    console.log(response);
    if(response.success){
      await checkAdmin(response.admin)
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
        router.push('/events')
        localStorage.setItem('token',response.token)
      }, 1500)
    }
    else{
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
        <h1 className='text-4xl font-bold'>Login to Your Account</h1>
        <form className='flex flex-col space-y-4 w-64 items-center'>
          <input type="email" placeholder='Email' value={credentials.email} name='email' onChange={handleChange}  className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
          <input type="password" placeholder='Password' value={credentials.password} name='password' onChange={handleChange}  className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
          <button type="submit" onClick={handleSubmit} className='bg-[#28b498] text-white p-2 rounded-md w-1/2'>Login</button>
        </form>
        <p>Don&apos;t have an account? <span onClick={() => router.push('/signup')} className='text-[#28b498] font-bold hover:underline hover:cursor-pointer'>Signup</span></p>
      </div>
    </div>
  )
}

export default Login
