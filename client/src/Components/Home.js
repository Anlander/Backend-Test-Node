import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';








function Home() {
    const [rooms, setRooms] = useState('');
    const [newRoom, updateNewRoom] = useState([]);
    const [updateRooms] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3020/getallrooms')
            .then(response => setRooms(response.data))
    }, [])

    if(rooms.length === 0) {
        return null;
    }

    function onChangeRoom (e){
      updateNewRoom(e.target.value);
      Home()

    }

    function onDelete(id) {

       axios.delete(`http://localhost:3020/chatroom/${id}`)
           .then((response) => {
               updateRooms(response.data.chatroom)
               console.log(response);
           })
           .catch(error => {
               console.log(error);
           })
   }

   function createRoom() {

      axios.post("http://localhost:3020/getallrooms", { roomName: newRoom })
          .then((response) => {
              Home()
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
              <td><NavLink to={`/chatroom/${room.id}`}>{room.roomName}</NavLink></td>
              <button onClick={() => onDelete()}>X</button>

            </tr>
          </tbody>
        )
    })

    return(
      <div>
      <input type="text" value={newRoom} placeholder='write room name' onChange={e => updateNewRoom(e.target.value)}></input>
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
