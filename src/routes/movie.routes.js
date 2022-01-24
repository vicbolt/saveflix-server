const { Router } = require('express');

const controllers = require('../controllers')

const router = Router();

router.post('/create', controllers.movie.create)

router.get('/getAll/:id', controllers.movie.getAll)

router.get('/explorar', controllers.movie.explorar)

router.get('/getOne/:id', controllers.movie.getOne)

router.get('/search/:title', controllers.movie.search)

router.get('/postRecientes', controllers.movie.postRecientes)

router.put('/update/:id', controllers.movie.update)

router.post('/likes', controllers.movie.likes)

router.post('/views', controllers.movie.views)

router.delete('/remove/:id', controllers.movie.remove)

router.get('/stats', controllers.movie.stats)

router.post('/duplicate', controllers.movie.duplicate)


module.exports = router