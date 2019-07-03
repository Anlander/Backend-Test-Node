import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';



function Home() {
    const [rooms, setRooms] = useState('');
    useEffect(() => {
        axios.get('http://localhost:3015/getallrooms')
            .then(response => setRooms(response.data))
    }, [])

    if(rooms.length === 0) {
        return null;
    }
    const allRooms = rooms.map((room, index) => {
        return <li key={index.toString()}><NavLink to={`/chatroom/${room.id}`}>{room.roomName}</NavLink></li>
    })
    return(
      <form className="form-field">
        <label>Display name</label>
        <input type="text" name="name" autofocus />
            <div>
                <ul>
                    {allRooms}
                </ul>
            </div>
        </form>
    )
}

export default Home;
