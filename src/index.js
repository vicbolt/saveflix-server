require("dotenv").config()

require('./database')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(process.env.PORT || 4500, () => {
  console.log('Server is running on port: 4500');
});

module.exports = server


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
