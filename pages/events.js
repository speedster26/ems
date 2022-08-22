import React from 'react'
import Image from 'next/image'
import Event from '../models/Event'
import mongoose from 'mongoose'
import { useRouter } from 'next/router'
const Events = ({events,admin,deleteEvent}) => {
  const router = useRouter()
  return (
    <div className='flex flex-col items-center space-y-6'>
      <h1 className='text-left font-semibold text-3xl p-2 text-[#28b498]'>Events</h1>
      <div className="relative text-gray-600 focus-within:text-gray-400">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </span>
        <input type="search" name="q" className='inline w-96 pr-3 pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm bg-[#eef6f3] hover:cursor-pointer' placeholder="Search..." autoComplete="off" />
        {admin && <button type="submit" onClick={()=>router.push("/eventadd")} className='bg-[#28b498] text-white rounded-md w-1/7 m-3 p-3'>ADD NEW EVENT</button>}
      </div>
      <div className='w-fit grid grid-flow-row grid-cols-3 gap-40'>
        {!events.length && <p>No events found</p>}
        {events && events.map((event,i)=>{return <div key={i} onClick={()=>router.push(`/events/${event.eventId}`)} className='grid-item flex flex-col border-2 shadow-lg hover:scale-105 transition-all items-center rounded-3xl w-fit p-6 justify-center hover:cursor-pointer'>
          <div>
            <Image src='/image1.jpg' className='object-contain' alt='' width={300} height={300} />
          </div>
          <div>
            <p>Event Name: {event.event_name}</p>
            <p>Start Time: {new Date(event.start_time).toLocaleString()}</p>
            <p>End Time: {new Date(event.end_time).toLocaleString()}</p>
            <p>Seats Left: {event.capacity}</p>
            {admin && <div className="md:ml-auto flex flex-wrap  text-base ">
                    <a onClick={()=>router.push(`/events/${event.eventId}`)} className="mr-5 hover:text-green-400 hover:scale-110 hover:cursor-pointer hover:underline transition-all">Modify</a>
                    <a onClick={()=>deleteEvent(event.eventId)} className="mr-5  hover:text-green-400 hover:scale-110 hover:cursor-pointer hover:underline transition-all">Delete</a>
            </div>}
          </div>
        </div>})}
      </div>
    </div>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI)
  }
  const events = await Event.find({})
  return {
    props: {
      events: JSON.parse(JSON.stringify(events))
    }
  }
}

export default Events
