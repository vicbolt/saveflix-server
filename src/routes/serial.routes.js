const { Router } = require('express');
const router = Router();

const controllers = require('../controllers')


router.post('/create', controllers.movie.create)

router.get('/getAll', controllers.movie.getAll)

router.put('/update/:id', controllers.movie.update)

router.delete('/remove/:id', controllers.movie.remove)



module.exports = router