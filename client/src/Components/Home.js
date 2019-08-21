import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';






function Home() {
    const [rooms, setRooms] = useState('');
    const [newRoom, refreshNewRoom] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/getallrooms')
            .then(response => setRooms(response.data))
    }, [])

    if(rooms.length === 0) {
        return null;
    }

    function refreshRooms() {
        axios
          .get("http://localhost:8000/getallrooms")
          .then(response => {
          setRooms(response.data)
          })
          .catch(error => console.log(error));
      }



    function onChangeRoom (e){
      refreshNewRoom(e.target.value);

    }

    function onDelete(id) {

       axios.delete(`http://localhost:8000/chatroom/${id}`)
           .then((response) => {
              refreshRooms()
               console.log(response);
           })
           .catch(error => {
               console.log(error);
           })
   }

   function createRoom() {

      axios.post("http://localhost:8000/getallrooms", { roomName: newRoom })
          .then((response) => {
              refreshRooms()
              console.log("hello" + response);
              console.log(newRoom);
          })
          .catch(error => {
              console.log(error);
          })
  }




    const allRooms = rooms.map((room, index) => {
        return (
          <tbody key={index.toString()}>
            <tr>
              <td><NavLink to={`/chatroom/${room.id}`} className="menu">{room.roomName}</NavLink></td>
              <button className="btn-menu" onClick={(id) => onDelete(room.id)}>X</button>

            </tr>
          </tbody>
        )
    })

    return(
      <div className="center">
      <input className="input-menu" type="text" value={newRoom} placeholder='Write room name' onChange={e => refreshNewRoom(e.target.value)}></input>
      <button className="btn-home" onClick={() => createRoom()}>CreateRoom</button>
            <div>
                <ul>
                    {allRooms}
                </ul>
            </div>
        </div>
    )
}

export default Home;
