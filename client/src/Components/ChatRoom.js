import React, { Component } from 'react';
import './style.css';
import socketIO from 'socket.io-client';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


// const io = require('socket.io-client');
// const socket = io()
// const username = prompt('enter name')
// socket.emit('add user', username);



function removeClassRom(e) {

      axios.delete(`/chatroom/${this.state.id}`)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            })
    }

class ChatRoom extends Component {
    state = {
        roomId: null,
        roomName: null,
        messages: [],
        username: '',
        message: ''
    }
    componentDidMount() {
        axios.get(`http://localhost:3030/chatroom/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    roomId: response.data.id,
                    roomName: response.data.roomName,
                    messages: response.data.messages
                })
            })
        this.listen = socketIO.connect('http://localhost:3030');
    }
    componentWillUnmount() {
        this.listen.disconnect('http://localhost:3030')
    }




    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    send = () => {
        const message = {
            id: this.state.roomId,
            messageId: Math.floor(Math.random() * 10000).toString(),
            username: this.state.username,
            message: this.state.message
        }
        this.listen.emit('newMessage', message)
        this.listen.on('newMessage', (data) => {
            this.setState({
                messages: [...this.state.messages, message]
            })
        })
    }


    render() {
        if(this.state.messages.length === 0) {
            return null
        }
        let messages = this.state.messages.map((message, index) => {
            return (
                <div  key={index.toString()}>
                    <p className="Username">{message.username}</p>
                    <p className="Message">{message.message}</p>
                </div>
            )
        })
        return(
        <div>
          <div className="chat__main">

            <div className="chat__sidebar">
            <button onClick={(e) => removeClassRom(e)}>Delete</button>
            <h1 className="headline"> Välkommen till {this.state.roomName} </h1>
            <NavLink className="back" to="/">Go To Rooms</NavLink>
                </div>
              <ol id="messages" className="chat__messages">{messages}</ol>
            <div className="chat__footer">
        <div className="form-field">
          <div id="message-form">
            <input placeholder="Username "type="text" name="username" onChange={(e) => this.onChange(e)} />
            <input placeholder="Message" name="message" onChange={(e) => this.onChange(e)}></input>
            <button key= {this.state.roomId} onClick={() => this.send()}>Skicka</button>
            </div>
         </div>
       </div>
     </div>
  </div>






        )
    }
}

export default ChatRoom;
