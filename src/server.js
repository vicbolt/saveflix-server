const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const routes = require('./routes')

const server = express();


//SETTINGS
server.set('PORT', process.env.PORT);

//MIDDLEWARES
server.use(express.json({ limit: '10mb' }));
server.use(express.urlencoded({ extended: false }));
server.use(morgan('dev'));
server.use(cors());


//ROUTES

server.get("/api/chat", (req,res) => {
   return res.send("HELLO WORLD")
})
server.use('/api/user', routes.user)
server.use('/api/movie', routes.movie)
server.use('/api/serial', routes.serial)
server.use('/api/movieComment', routes.movieComment)
server.use('/api/serialComment', routes.serialComment)
server.use('/api/moviePendiente', routes.moviePendiente)
server.use('/api/serialPendiente', routes.serialPendiente)


server.get("/", (req,res) => {
   return res.json({ msg: "bienvenido"})
})


//STATIC-PUBLIC FOLDER
server.use(express.static(path.join(__dirname, 'public')));


module.exports = server;