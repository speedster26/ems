import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const Map = ({ events }) => {
    console.log(events);
    return (
        <>  {events.length===0 && <h1 className='text-center text-2xl'>No events to show</h1>}
            {events.length!==0 && <MapContainer center={[events[0].location.Lat, events[0].location.Lon]} zoom={8} scrollWheelZoom={true} style={{ height: "100%", width: "100%", overflow: 'hidden' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {events && events.map((event, i) => {
                    return <Marker key={i} position={[event.location.Lat, event.location.Lon]} draggable={true} animate={true} >
                        <Popup>
                            <span>Event Name : {event.event_name}</span><br></br>
                            <span>Start Time : {new Date(event.start_time).toLocaleString()}</span><br></br>
                            <span>End Time : {new Date(event.end_time).toLocaleString()}</span>
                        </Popup>
                    </Marker>
                })}
            </MapContainer>}
        </>
    )
}

export default Map
