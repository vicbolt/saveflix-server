const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const routes = require('./routes')

const server = express();


//SETTINGS
server.set('PORT', process.env.PORT || 4500);

//MIDDLEWARES
server.use(express.json({ limit: '10mb' }));
server.use(express.urlencoded({ extended: false }));
server.use(morgan('dev'));
server.use(cors());


server.use('/api/user', routes.user)
server.use('/api/movie', routes.movie)
server.use('/api/serial', routes.serial)
server.use('/api/movieComment', routes.movieComment)
server.use('/api/serialComment', routes.serialComment)
server.use('/api/moviePendiente', routes.moviePendiente)
server.use('/api/serialPendiente', routes.serialPendiente)
server.use('/api/msg', routes.msg)


server.get("/", (req,res) => {
   return res.send("bienvenido")
})


//STATIC-PUBLIC FOLDER
server.use(express.static(path.join(__dirname, 'public')));


module.exports = server;