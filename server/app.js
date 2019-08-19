import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import socketIO from 'socket.io';
const io = socketIO(server);
import cors from 'cors';
const fs = require('fs');
const readingFile = fs.readFileSync("rooms.json");
const data = JSON.parse(readingFile)

app.use(cors())

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
        console.log('hello room id',room.id);
        allRooms.push(roomInfo)
    })
    return res.json(allRooms)
})

app.get('/chatroom/:id', (req, res) => {
    const id = req.params.id;
    console.log('id',id)
    const singleRoom = data.Chatrooms.find(room => room.id === id)
    return res.json(singleRoom)
})


app.post('/getallrooms', (req, res ) => {
  const rooms = {
    id:rooms.length + 1,
    name: request.body.roomName,
  }
  rooms.push(rooms);
  response.json(rooms);

});





// app.delete("/chatroom/:id", (req, res) => {
//     const id = req.params.id;
//
//     if (!id) {
//         res.status(400).end();
//         return;
//     }
//     const singleRoom = data.Chatrooms.find(room => room.id === id)
//     console.log("delete index:" + roomIdx);
//     if (singleRoom !== -1) {
//         rooms.chatrooms.splice(singleRoom, 1);
//     }
//     let data = JSON.stringify(singleRoom);
//     fs.writeFile('rooms.json', data, (err) => {
//         if (err) {
//             res.status(500).end();
//             return;
//         }
//
//     });
//     res.status(204).end()
// });










const port = 8000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
