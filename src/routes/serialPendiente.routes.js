const { Router } = require('express');


const controllers = require('../controllers')


const router = Router();

router.post('/create', controllers.serialPendiente.create)

router.get('/getAll/:id', controllers.serialPendiente.getAll)

router.get('/getOne/:id', controllers.serialPendiente.getOne)

router.delete('/remove/:id', controllers.serialPendiente.remove)

module.exports = router