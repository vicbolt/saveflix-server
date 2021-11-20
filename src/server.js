const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const apiRoutes = require('./routes')

const server = express();


//SETTINGS
server.set('PORT', 4500);

//MIDDLEWARES
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan('dev'));
server.use(cors());


//ROUTES
// server.use('/api/movie', apiRoutes.movie)
// server.use('/api/serial', apiRoutes.serial)
// server.use('/api/user', apiRoutes.user)



//STATIC-PUBLIC FOLDER
server.use(express.static(path.join(__dirname, 'public')));


module.exports = server;