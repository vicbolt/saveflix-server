require("dotenv").config()

require('./database')


const server = require("./server")
const app = require('express')();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
      origins: ['http://localhost:3000']
    }
  });

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  http.listen(server.get("PORT"), () => {
    console.log('listeninghttp on: ', server.get("PORT"));
  });