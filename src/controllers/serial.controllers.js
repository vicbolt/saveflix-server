const models = require('../models')

const create = async (req,res) => {

    try {
        const { title, director, description, score, image, owner, likes, views } = req.body;

        const serial = models.serial({ title, director, description, score, image, owner, likes, views })

        await serial.save()

        return res.status(200).json({ serial })

    } catch(error) {
        return res.status(500).json({ error: 'No se ha podido crear la publicación' })
    }
}

const getAll = async (req,res) => {
    
    try{
        const serials = await models.serial.find()

        return res.status(200).json({ serials })

    } catch (error){
        return res.status(500).json({ error: 'No ha sido posible obtener las películas' })
    }
}

const update = async (req,res) => {
    try{

        const { id } = req.params
        const { title, director, description, score, image, owner, likes, views } = req.body;

        const serial = await models.serial.findById(id)
        serial.title = title
        serial.director = director
        serial.description = description
        serial.score = score
        serial.image = image
        serial.owner = owner
        serial.likes = likes
        serial.views = views

        await serial.save()

        return res.status(200).json({ serial })

    } catch(error) {
        return res.status(500).json({ error: 'No ha sido posible actualizar la película' })
    }
}

const remove = async (req,res) => {

    try{
        const { id } = req.params

        const serial = await models.serial.findByIdAndRemove(id)

        return res.status(200).json({ serial })

    } catch(error) {
        return res.status(500).json({ error: 'No ha sido posible eliminar la película' })
    }
}


module.exports = {
    create,
    getAll,
    update,
    remove
}