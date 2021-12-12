const models = require('../models')


const create = async (req, res) => {
    try{
        const { message, userId, postId } = req.body

        const user = await models.user.findById(userId)
        if(!user){
            return res.status(400).json({ error: 'El usuario no existe'})
        }

        const post = await models.serial.findById(postId)
        if(!post){
            return res.status(400).json({ error: 'El post que intenta comentar no existe'})
        }

        const comment = await models.serialComment.create({
            message,
            user,
            post
        })

        return res.status(200).json({ comment })

    } catch (error){
        return res.status(500).json({error: 'No ha sido posible crear el comentario'})
    }
}

const getComments = async (req, res) => {
    try{
        const { id } = req.params

        const comments = await models.serialComment.find({post: id}).populate("user").sort({ createdAt: 'desc'})

        return res.status(200).json({comments})


    } catch (error){
        return res.status(500).json({ error: 'No ha sido posible obtener los comentarios' })
    }
}

const latestComments = async (req,res) => {

    const comments = await models.serialComment.find().populate("user").populate("post").sort({ createdAt : 'desc'}).limit(2)

    return res.status(200).json({comments})
}

const getOne = async (req, res) => {
    try{
        return res.json('GETONE')

    } catch (error){
        return res.status(500).json({error: 'No ha sido posible obtener el comentario'})
    }
}

const remove = async (req, res) => {
    try{
        return res.json('REMOVE')

    } catch (error){
        return res.status(500).json({error: 'No ha sido posible eliminar el comentario'})
    }
}

module.exports = {
    create,
    getComments,
    latestComments,
    getOne,
    remove
}