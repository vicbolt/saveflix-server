const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const routes = require('./routes')

const server = express();


//SETTINGS
server.set('PORT', process.env.PORT ?? 4500);

//MIDDLEWARES
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan('dev'));
server.use(cors());


//ROUTES
server.use('/api/user', routes.user)
server.use('/api/movie', routes.movie)
server.use('/api/serial', routes.serial)
server.use('/api/movieComment', routes.movieComment)
server.use('/api/serialComment', routes.serialComment)




//STATIC-PUBLIC FOLDER
server.use(express.static(path.join(__dirname, 'public')));


module.exports = server;