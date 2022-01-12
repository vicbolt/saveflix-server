const models = require('../models')


const create = async (req, res) => {
    try{
        const { message, userId, postId } = req.body

        const user = await models.user.findById(userId)
        if(!user){
            return res.status(400).json({ error: 'El usuario no existe'})
        }

        const post = await models.movie.findById(postId)
        if(!post){
            return res.status(400).json({ error: 'El post que intenta comentar no existe'})
        }

        const date = new Date()

        const options = { year: 'numeric', month: "long", day: "numeric" }

        const europeDate = date.toLocaleDateString("es-Es", options)


        const comment = await models.movieComment.create({
            message,
            user,
            post,
            postId,
            date: europeDate
        })

        return res.status(200).json({ comment })

    } catch (error){
        return res.status(500).json({error: 'No ha sido posible crear el comentario'})
    }
}

const getComments = async (req, res) => {
    try{
        const { id } = req.params

        const comments = await models.movieComment.find({post: id}).populate("user").populate("post").sort({ createdAt: 'desc'})

        return res.status(200).json({comments})


    } catch (error){
        return res.status(500).json({ error: 'No ha sido posible obtener los comentarios' })
    }
}

const latestComments = async (req,res) => {

    const comments = await models.movieComment.find().populate("user").populate("post").sort({ createdAt : 'desc'}).limit(2)
    

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
        const {id} = req.params

        const comment = await models.movieComment.findByIdAndDelete(id)

        return res.status(200).json({comment})

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