import express from 'express';
const path = require('path');
const app = express();
import http from 'http';
const server = http.createServer(app);
import socketIO from 'socket.io';
const io = socketIO(server);
const publicPath = path.join(__dirname, "/../public");
import cors from 'cors';
const {realString} = require('./utils/realString');
const {Users} = require('./utils/users');
const fs = require('fs');
const readingFile = fs.readFileSync("rooms.json");
const data = JSON.parse(readingFile);
let users = new Users();

app.use(cors())
app.use(express.static(publicPath));

io.on('connection', (socket) => {

socket.on('join', (params, callback) => {
  if(!realString(params.name) || !realString(params.room)){
    return callback('name is req')
  }
  socket.join(params.room);
      users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
          io.to(params.room).emit('updateUsersList', users.getUserList(params.room))
            let user = users.getUser(socket.id);

              socket.emit('newMessage', generateMessage('Admin', `Welcome to Room ${params.room}`));
                io.to(users.room).emit('newMessage', generateMessage('Admin', `${users.name}`));


            callback();
})


    console.log('There is connection')
    socket.on('newMessage', (message) => {
        let insertArray = data.Chatrooms.filter(room => room.id === message.id);
        let messageArray = insertArray[0].messages;
        messageArray.push(message)
        fs.writeFileSync('rooms.json', JSON.stringify(data))
        socket.emit('newMessage', message)
    })
})

app.get('/getallrooms', (req, res) => {
    let allRooms = [];
    data.Chatrooms.map(room => {
        let roomInfo = {
            id: room.id,
            roomName: room.roomName
        }
        allRooms.push(roomInfo)
    })
    return res.json(allRooms)
})

app.get('/chatroom/:id', (req, res) => {
    const id = req.params.id;
    console.log(data.Chatrooms)
    const singleRoom = data.Chatrooms.find(room => room.id === id)
    return res.json(singleRoom)
})


const port = 3015;
server.listen(port, () => console.log(`Server is running on port ${port}`));
