const { Router } = require('express');


const controllers = require('../controllers')

const config = require('../config')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, config.imageFolder)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '.jpg')
    }
})

const uploads = multer({
    storage: storage,
    limits: {
        // fileSize: 20000000000,
    }
})

const router = Router();

router.post('/create', uploads.single('image'), controllers.serial.create)

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