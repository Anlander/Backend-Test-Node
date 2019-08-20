import express from 'express';
const app = express();
const http = require('http');
const server = http.createServer(app);
import socketIO from 'socket.io';
const io = socketIO(server);
import cors from 'cors';
const fs = require('fs');
const readingFile = fs.readFileSync("rooms.json");
const data = JSON.parse(readingFile)
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000
app.use(express.static("public-client"));

app.use(bodyParser());





app.use(cors())

io.on('connection', (socket) => {




    console.log('There is connection')
    socket.on('newMessage', (message) => {
        let insertArray = data.Chatrooms.filter(room => room.id === message.id);
        let messageArray = insertArray[0].messages;
        messageArray.push(message)
        fs.writeFileSync('rooms.json', JSON.stringify(data))

        io.emit('newMessage', message)
        console.log(message);
    })

    socket.on ('disconnect', () => {
      console.log('User Was Disconnected');

    })

})

app.get('/getallrooms', (req, res) => {
    let allRooms = [];
    data.Chatrooms.map(room => {
        let roomInfo = {
            id:room.id,
            roomName: room.roomName,


        }
        // console.log('hello room id',room.id);
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
  let room = {
    roomName:req.body.roomName,
    id: data.Chatrooms.length + "",
    messages:[""]
   };

  data.Chatrooms.push(room)
  res.send(room)
  fs.writeFileSync('rooms.json', JSON.stringify(data))
  console.log(req.body);
});



app.delete("/chatroom/:id", (req, res) => {
    const id = req.params.id
    console.log(id);
    if (!id) {
        res.status(400).end();
        return;
    }

    const roomDelete = data.Chatrooms.findIndex(room => room.id === id);
    data.Chatrooms.splice(roomDelete, 1);
    let json = JSON.stringify(data);

    fs.writeFile('rooms.json', json, (err) => {
        if (err) {
            res.status(500).end();
            return;
        }
        console.log('Data written efter delete:');

    });

  res.send(204)
  res.end()
});







server.listen(port, () => console.log(`Server is running on port ${port}`));
