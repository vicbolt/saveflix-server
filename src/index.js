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

const express = require ("express")
const app = express()
const server = require("http").Server(app)
io = require("socket.io")(server)

server.listen(4500, function() {
    console.log("Server is running on port 4500")
})

io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado", socket.id)
})

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
