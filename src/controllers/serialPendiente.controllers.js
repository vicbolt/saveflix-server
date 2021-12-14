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

        const serial = await models.serialPendiente.create({
            title,
            director,
            image: filename,
            user,
            post: "serial"
        })

        return res.status(200).json({ serial })

    }catch(error){
        return res.status(500).json({error: 'No se ha podido crear la publicación'})
    }
}

const getAll = async (req,res) => {
    try{
        const {userId} = req.params

        const serialsP = await models.serialPendiente.find({userId: userId})

        return res.status(200).json({serialsP})

    }catch(error){
        return res.json(error)
    }
}

const getOne = async (req,res) => {
    try{
        const {id} = req.params

        const serialP = await models.serialPendiente.findById(id)

        return res.status(200).json({serialP})

    }catch(error){
        return res.json(error)
    }
}


const remove = async (req,res) => {
    try{

        const {id} = req.params

        const serialP = await models.serialPendiente.findByIdAndRemove(id)

        return res.status(200).json({serialP})

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