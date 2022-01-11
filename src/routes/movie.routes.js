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

router.post('/create', controllers.movie.create)

router.get('/getAll/:id', controllers.movie.getAll)

router.get('/explorar', controllers.movie.explorar)

router.get('/getOne/:id', controllers.movie.getOne)

router.get('/search/:title', controllers.movie.search)

router.get('/postRecientes', controllers.movie.postRecientes)

router.put('/update/:id', controllers.movie.update)

router.post('/likes', controllers.movie.likes)

router.post('/views', controllers.movie.views)

router.delete('/remove/:id', controllers.movie.remove)

router.get('/stats', controllers.movie.stats)

router.post('/duplicate', controllers.movie.duplicate)


module.exports = router