const { Router } = require('express');

const controllers = require('../controllers')


const router = Router();


router.get('/chat', controllers.movie.getAll)


module.exports = router