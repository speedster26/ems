import React from 'react'
import dynamic from 'next/dynamic';
var jwt = require('jsonwebtoken');
import mongoose from 'mongoose';
import User from '../models/User';

const Maps = ({events}) => {
    const MapNoSSR = dynamic(() => import('../components/map'), {
        ssr: true
    });
    return (
            <div id='map' className='w-screen h-screen'>
                <MapNoSSR events={events}/>
            </div>
    )
}

export default Maps
export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        mongoose.connect(process.env.MONGO_URI)
    }
    if(context.query.token){
        var t = jwt.verify(context.query.token, process.env.JWT_SECRET)
    }
    let user = await User.findOne({email:t.email})
    console.log(user.events);
    const events = user.events
    console.log(events);
    return {
        props: {
            events: JSON.parse(JSON.stringify(events))
        }
    }
}