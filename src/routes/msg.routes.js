const { Router } = require('express');

const controllers = require('../controllers')

const router = Router();

router.post('/create', controllers.msg.createMsg)

router.get('/getAll', controllers.msg.getMsg)

module.exports = router