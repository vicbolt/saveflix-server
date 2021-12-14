const { Router } = require('express');
const router = Router();

const controllers = require('../controllers')

const multer = require('multer')

const config = require('../config')

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


router.post('/login', controllers.user.login)

router.post('/signup', uploads.single('avatar'), controllers.user.signUp)

router.get('/getAll', controllers.user.getAll)

router.get('/followers/:id', controllers.user.followers)

router.get('/following/:id', controllers.user.following)

router.get('/getOne/:id', controllers.user.getOne)

router.put('/saveEmail/:id', controllers.user.saveEmail)
router.put('/saveUsername/:id', controllers.user.saveUsername)
router.put('/savePassword/:id', controllers.user.savePassword)
router.put('/saveAvatar/:id', uploads.single('avatar'), controllers.user.saveAvatar)

router.post('/follow', controllers.user.follow)

router.delete('/remove/:id', controllers.user.remove)



module.exports = router