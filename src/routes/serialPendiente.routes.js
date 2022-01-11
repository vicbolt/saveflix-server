const { Router } = require('express');


const controllers = require('../controllers')

// const config = require('../config')

// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null, config.imageFolder)
//     },
//     filename: function(req, file, cb){
//         cb(null, Date.now() + '.jpg')
//     }
// })

// const uploads = multer({
//     storage: storage,
//     limits: {
//         // fileSize: 20000000000,
//     }
// })

const router = Router();

router.post('/create', controllers.serialPendiente.create)

router.get('/getAll/:id', controllers.serialPendiente.getAll)

router.get('/getOne/:id', controllers.serialPendiente.getOne)

router.delete('/remove/:id', controllers.serialPendiente.remove)

module.exports = router