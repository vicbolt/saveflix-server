const { Router } = require('express');

const controllers = require('../controllers')

const router = Router();

router.post('/create', controllers.msg.createMsg)

router.get('/getAll/:userOne/:userTwo', controllers.msg.getMsg)

module.exports = router