const { Router } = require('express');


const controllers = require('../controllers')


const router = Router();

router.post('/create', controllers.serial.create)

router.post('/duplicate', controllers.serial.duplicate)

router.get('/getAll/:id', controllers.serial.getAll)

router.get('/explorar', controllers.serial.explorar)

router.get('/getOne/:id', controllers.serial.getOne )

router.get('/postRecientes', controllers.serial.postRecientes)

router.post('/likes', controllers.serial.likes)

router.post('/views', controllers.serial.views)

router.put('/update/:id', controllers.serial.update)

router.delete('/remove/:id', controllers.serial.remove)

router.get('/stats', controllers.serial.stats)



module.exports = router