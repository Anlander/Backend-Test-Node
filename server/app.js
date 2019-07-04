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


const users = {}

app.use(cors())
app.use(express.static(publicPath));

io.on('connection', (socket) => {
console.log('connected')



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



app.delete('/api/rooms/:id', (req, res) => {
    // Look up the room if no exist, return 404
    const room = rooms.find(e => e.id === parseInt(req.params.id));
    if (!room)
        return res.status(404).send('The room with specific id is not found');
    // Delete
    const index = rooms.indexOf(room);
    rooms.splice(index, 1);
    // Return the deleted room
    res.send(room);

    // Fs module
    let data = JSON.stringify(rooms);
    fs.writeFile('rooms.json', data, done);




    function done(err) {
        console.log('working')
    }

});



app.post('/api/rooms', (req, res) => {
    //Validation for unique room
    for (let room of rooms) {
        if (room.name === req.body.name) {
          res.status(409).send("other room");
          return;
        }
    }
    // Validate, if invalid return 400 - Bad request
    if (!req.body.name)
        return res.status(400).send('Name is required')
    // room to be added
    const room = {
        id: rooms.length + 1,
        name: req.body.name
    };
    // Add the room with push
    console.log('hej',room);
    rooms.push(room);
    // Return the added room
    res.send(room)

    // Fs module
    let data = JSON.stringify(rooms);
    fs.writeFile('rooms.json', data, done);
    function done(err) {



      console.log('working');
    }

});




const port = 3015;
server.listen(port, () => console.log(`Server is running on port ${port}`));
