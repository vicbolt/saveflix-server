const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('nuevo usuario conectado');
});

server.listen(process.env.PORT || 4500, () => {
    console.log('Server is running on port: 4500');
  });

