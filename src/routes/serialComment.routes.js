const { Router } = require('express');
const router = Router();

const controllers = require('../controllers')


router.post('/create', controllers.serialComment.create)

router.get('/getComments/:id', controllers.serialComment.getComments)

router.get('/latestComments', controllers.serialComment.latestComments)

router.get('/getOne/:id', controllers.serialComment.getOne)

router.delete('/remove/:id', controllers.serialComment.remove)



module.exports = router