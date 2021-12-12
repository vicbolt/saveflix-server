const { Router } = require('express');
const router = Router();

const controllers = require('../controllers')


router.post('/create', controllers.movieComment.create)

router.get('/getComments/:id', controllers.movieComment.getComments)

router.get('/latestComments', controllers.movieComment.latestComments)

router.get('/getOne/:id', controllers.movieComment.getOne)

router.delete('/remove/:id', controllers.movieComment.remove)



module.exports = router