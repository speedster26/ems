import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const EventAdd = () => {
  const router = useRouter()
  const [val, setval] = useState({ event_desc: '', event_name: '', start_time: '', end_time: '', Lat: '', Lon: '', image: '', capacity: '' })
  const handleChange = (e) => {
    setval({ ...val, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/addevent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: val.event_name,
        stime: val.start_time,
        etime: val.end_time,
        desc: val.event_desc,
        location: { Lat: val.Lat, Lon: val.Lon },
        img: val.image,
        capacity: val.capacity
      })
    })
    const json = await res.json()
    if (json.success) {
      router.push('/events')
    }
  }

  return (
    <div>
      <div className='flex justify-center w-fit mx-auto items-center h-screen'>
        <div className='flex flex-col space-y-5 items-center'>
          <h1 className='text-4xl font-bold'>Create a new Event</h1>
          <form className='flex flex-col space-y-4 w-64 items-center'>
            <input type='text' placeholder='Event Name' value={val.event_name} name='event_name' onChange={handleChange} className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
            <textarea type='text' placeholder='Event Description' value={val.event_desc} name='event_desc' onChange={handleChange} cols={30} rows={5} className='resize-none appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
            <input type='datetime-local' placeholder='Start Time' value={val.start_time} name='start_time' onChange={handleChange} className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
            <input type='datetime-local' placeholder='End Time' value={val.end_time} name='end_time' onChange={handleChange} className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
            <input type='Number' placeholder='Latitude' value={val.Lat} name='Lat' onChange={handleChange} className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
            <input type='Number' placeholder='Longitude' value={val.Lon} name='Lon' onChange={handleChange} className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
            <input type='Number' placeholder='Capacity' value={val.capacity} name='capacity' onChange={handleChange} className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3]' />
            <button type="submit" onClick={handleSubmit} className='bg-[#28b498] text-white p-2 rounded-md w-1/2'>SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EventAdd