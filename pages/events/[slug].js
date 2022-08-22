import React from 'react'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import Event from '../../models/Event'
import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Slug = ({ event, admin }) => {
  const [val, setval] = useState({ eventId:event.eventId, event_desc: event.event_desc, event_name: event.event_name, start_time: event.start_time, end_time: event.end_time, Lat: event.location.Lat, Lon: event.location.Lon, image: event.image, capacity: event.capacity })
  const router = useRouter()
  const [user, setUser] = useState({})
  const [regEvents, setRegEvents] = useState()
  const [capacity, setCapacity] = useState(event.capacity)
  const registerNow = async () => {
    const res = await fetch('/api/modifyevent', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventId: event.eventId,
        admin: false,
        token: localStorage.getItem('token')
      })
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
      setCapacity(response.capacity)
    }
    else if(!response.success){
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

  const handleChange = (e) => {
    setval({...val,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/modifyevent', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventId: val.eventId,
        name: val.event_name,
        stime: val.start_time,
        etime: val.end_time,
        desc: val.event_desc,
        location: { Lat: val.Lat, Lon: val.Lon },
        img: val.image,
        capacity: val.capacity,
        admin: true,
        token: localStorage.getItem('token')
      })
    })
    const response = await res.json()
    if(response.success){
      router.push(`${process.env.NEXT_PUBLIC_HOST}/events`)
    }
  }
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="../../image1.jpg" />
          {!admin && <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{event.event_name}</h1>
            <p className="leading-relaxed">{event.event_desc}</p>
            <p className="leading-relaxed">{new Date(event.start_time).toLocaleString()}</p>
            <p className="leading-relaxed">{new Date(event.end_time).toLocaleString()}</p>
            <p className="leading-relaxed">{capacity}</p>
            <div className="flex">
              <button onClick={registerNow} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Register Now</button>
            </div>
          </div>}
          {admin && <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <form className='flex flex-col space-y-4 w-64 items-center'>
              <input type='text' placeholder='Event Name' value={val.event_name} name='event_name' onChange={handleChange} className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
              <textarea type='text' placeholder='Event Description' value={val.event_desc} name='event_desc' onChange={handleChange} cols={30} rows={5} className='resize-none appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
              <input type='text' placeholder='Start Time' value={val.start_time} name='start_time' onChange={handleChange} className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
              <input type='text' placeholder='End Time' value={val.end_time} name='end_time' onChange={handleChange} className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
              <input type='text' placeholder='Latitude' value={val.Lat} name='Lat' onChange={handleChange} className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
              <input type='text' placeholder='Longitude' value={val.Lon} name='Lon' onChange={handleChange} className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
              <input type='Number' placeholder='Capacity' value={val.capacity} name='capacity' onChange={handleChange} className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
              <button type="submit" onClick={handleSubmit} className='bg-[#28b498] text-white p-2 rounded-md w-1/2'>SUBMIT</button>
            </form>
          </div>}
        </div>
      </div>
    </section>
  )
}
export default Slug

export async function getServerSideProps(context) {
   if (!mongoose.connections[0].readyState) {
     mongoose.connect(process.env.MONGO_URI)
   }
   
   const event = await Event.findOne({ eventId: context.query.slug })
   return {
     props: {
       event: JSON.parse(JSON.stringify(event))
     }
   }
 }
