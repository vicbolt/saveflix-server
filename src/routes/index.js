const movie = require('./movie.routes')
const serial = require('./serial.routes')
const user = require('./user.routes')
const movieComment = require('./movieComment.routes')
const serialComment = require('./serialComment.routes')
const moviePendiente = require('./moviePendiente.routes')
const serialPendiente = require('./serialPendiente.routes')

module.exports = {
    movie,
    serial,
    user,
    movieComment,
    serialComment,
    moviePendiente,
    serialPendiente,
}