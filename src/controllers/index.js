const movie = require('./movie.controllers')
const serial = require('./serial.controllers')
const user = require('./user.controllers')
const movieComment = require('./movieComment.controllers')
const serialComment = require('./serialComment.controllers')
const moviePendiente = require('./moviePendiente.controllers')
const serialPendiente = require('./serialPendiente.controllers')

module.exports = {
    movie,
    serial,
    user,
    movieComment,
    serialComment,
    moviePendiente,
    serialPendiente,
}