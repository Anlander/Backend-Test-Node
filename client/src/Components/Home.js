import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Delete(id) {
      axios.delete(`/chatrooms/${id}`)
          .then((response) => {
              console.log(response);
          })
          .catch(error => {
              console.log(error);
          })
  }

function Home() {
    const [rooms, setRooms] = useState('');
    useEffect(() => {
        axios.get('http://localhost:3030/getallrooms')
            .then(response => setRooms(response.data))
    }, [])

    if(rooms.length === 0) {
        return null;
    }
    const allRooms = rooms.map((room, index) => {
        return <li key={index.toString()}><button onClick={(id) => Delete(room.id)} >Delete</button><NavLink to={`/chatroom/${room.id}`}>{room.roomName}</NavLink></li>
    })
    return(
      <form className="form-field">
        <label>Display name</label>
        <input type="input" name="name" autofocus />
            <div>
                <ul>
                    {allRooms}
                </ul>
            </div>
        </form>
    )
}

export default Home;
