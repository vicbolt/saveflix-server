const { Router } = require('express');
const router = Router();

const controllers = require('../controllers')


router.post('/login', controllers.user.login)

router.post('/signup', controllers.user.signUp)

router.get('/getAll', controllers.user.getAll)

router.put('/update/:id', controllers.user.update)

router.delete('/remove/:id', controllers.user.remove)



module.exports = router