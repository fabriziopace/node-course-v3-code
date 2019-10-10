const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
const { generateMessage, generateLocationMessage } = require('./utils/messages');

app.use(express.static(publicDirectoryPath));


io.on('connection', (socket) => {
    console.log('New webSocket Connection');

    socket.on('join', ({ username, room }) => {
        socket.join(room)

        socket.emit('message', generateMessage('Welcome')); // send only for the new user
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`)); // send to everyone connected except for the new user

        // socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit, socket.broadcast.to.emit
    });

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }

        io.to('Center City').emit('message', generateMessage(message)); // send to all users
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'));
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});