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

router.post('/create', uploads.single('image'), controllers.moviePendiente.create)

router.get('/getAll/:id', controllers.moviePendiente.getAll)

router.get('/getOne/:id', controllers.moviePendiente.getOne)

router.delete('/remove/:id', controllers.moviePendiente.remove)



module.exports = router