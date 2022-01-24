require("dotenv").config()

require('./database')


//ESTO SI QUE FUNCIONA

// const server = require('./server');

// const app = server.listen(3500, () =>{
//     console.log("CHAT is running on port 3500")
// })

// const socketIO = require("socket.io")
// const io = socketIO(app)

// module.exports = io

//hasta aqui

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
    console.log('listening on: ', server.get("PORT"));
  });


// io.on("connection", (socket) => {
//     console.log("socket", socket.id) //De esta forma imprimimos el id de conexion cuando alguien se conecta

//     socket.on('message', (msg)=>{  //recibo un msg
//         io.emit('message', msg); // transmito a todo el mundo el msg
//     })

//     socket.on("writing", (msg) => {
//         socket.broadcast.emit("writing", msg)
//     })

//     socket.on("disconnect", () => {
//         console.log("socket disconnected") //envia un console.log de la desconexión del socket
//     })
// })


// server.listen(server.get('PORT'), () =>{
//     console.log('Server is running on port ', server.get('PORT'))
// });

// module.exports = server
