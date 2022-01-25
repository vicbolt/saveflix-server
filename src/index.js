require("dotenv").config()

require('./database')



const server = require('./server');

const app = server.listen(4500, () =>{
    console.log("server is running on port 4500")
})

const socketIO = require("socket.io")
const io = socketIO(app)

module.exports = io