const models = require('../models')


const create = async (req,res) => {
    try{

        const { title, director, description, score, image, owner, likes, views } = req.body;

        const movie = models.movie({ title, director, description, score, image, owner, likes, views })

        await movie.save()

        return res.status(200).json({movie})

    }catch(error){
        return res.status(500).json({error: 'No se ha podido crear la publicación'})
    }
}

const getAll = async (req,res) => {
    try{

        const movies = await models.movie.find()

        return res.status(200).json({ movies })

    } catch (error){
        return res.status(500).json({error: 'No ha sido posible obtener las películas'})
    }
}

const update = async (req,res) => {
    try{

        const {id} = req.params
        const { title, director, description, score, image, owner, likes, views } = req.body;

        const movie = await models.movie.findById(id)
        movie.title = title
        movie.director = director
        movie.description = description
        movie.score = score
        movie.image = image
        movie.owner = owner
        movie.likes = likes
        movie.views = views

        await movie.save()

        return res.status(200).json({movie})
        

    } catch(error){
        return res.status(500).json({error: 'No ha sido posible actualizar la película'})
    }
}

const remove = async (req,res) => {
    try{

        const {id} = req.params

        const movie = await models.movie.findByIdAndRemove(id)

        return res.status(200).json({movie})

    } catch(error){
        return res.status(500).json({error: 'No ha sido posible eliminar la película'})
    }
}


module.exports = {
    create,
    getAll,
    update,
    remove
}