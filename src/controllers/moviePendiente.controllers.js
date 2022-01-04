const models = require('../models')
const config = require('../config')


const create = async (req,res) => {
    try{
        const { title, director, userId } = req.body;

        const hostname = config.hostname
        const file = req.file
        const filename = hostname + file.filename

        const user = await models.user.findById(userId)
        if(!user){
            return res.status(400).json({error: 'El usuario no existe'})
        }

        const movie = await models.moviePendiente.create({
            title,
            director,
            image: filename,
            userId: user,
            post: "movie"
        })

        return res.status(200).json({ movie })

    }catch(error){
        return res.status(500).json({error: 'No se ha podido crear la publicación'})
    }
}

const getAll = async (req,res) => {
    try{
        const {id} = req.params

        console.log(id)

        const moviesPendientes = await models.moviePendiente.find({userId: id})

        return res.status(200).json({moviesPendientes})

    }catch(error){
        return res.json(error)
    }
}

const getOne = async (req,res) => {
    try{
        const {id} = req.params

        const movieP = await models.moviePendiente.findById(id)

        return res.status(200).json({movieP})

    }catch(error){
        return res.json(error)
    }
}


const remove = async (req,res) => {
    try{

        const {id} = req.params

        const movieP = await models.moviePendiente.findByIdAndRemove(id)

        return res.status(200).json({movieP})

    } catch(error){
        return res.status(500).json({error: 'No ha sido posible eliminar la película'})
    }
}




module.exports = {
    create,
    getAll,
    getOne,
    remove,
}