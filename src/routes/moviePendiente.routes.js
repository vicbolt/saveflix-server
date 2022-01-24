const { Router } = require('express');

const controllers = require('../controllers')

const router = Router();

router.post('/create', controllers.moviePendiente.create)

router.get('/getAll/:id', controllers.moviePendiente.getAll)

router.get('/getOne/:id', controllers.moviePendiente.getOne)

router.delete('/remove/:id', controllers.moviePendiente.remove)



module.exports = router