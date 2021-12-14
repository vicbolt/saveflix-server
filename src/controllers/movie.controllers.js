const models = require('../models')

const config = require('../config')


const create = async (req,res) => {
    try{
        const { title, director, description, score, userId } = req.body;

        const hostname = config.hostname
        const file = req.file
        const filename = hostname + file.filename

        const user = await models.user.findById(userId)
        if(!user){
            return res.status(400).json({error: 'El usuario no existe'})
        }

        const movie = await models.movie.create({
            title,
            director, 
            description, 
            score, 
            image: filename,
            user,
            post: "movie"
        })

        return res.status(200).json({ movie })

    }catch(error){
        return res.status(500).json({error: 'No se ha podido crear la publicación'})
    }
}

const duplicate = async (req,res) => {
    try{
        const { title, director, description, score, userId, image } = req.body;


        const user = await models.user.findById(userId)
        if(!user){
            return res.status(400).json({error: 'El usuario no existe'})
        }

        const movie = await models.movie.create({
            title,
            director, 
            description, 
            score, 
            image,
            user,
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

        const movies = await models.movie.find({user: id}).sort({ createdAt: "desc"})

        const ranking = await models.movie.find({user: id}).sort({ score: 'desc'}).limit(10)

        return res.status(200).json({ movies, ranking })

    } catch (error){
        return res.status(500).json({error: 'No ha sido posible obtener las películas'})
    }
}

const explorar = async (req,res) => {
    try{

        const movies = await models.movie.find().sort({ createdAt: "desc"})

        return res.status(200).json({ movies })

    } catch (error){
        return res.status(500).json({error: 'No ha sido posible obtener las películas'})
    }
}

const likes = async (req,res) => {
    try{

        const { postId } = req.body

        const movie = await models.movie.findById(postId)
        if(!movie){
            return res.status(400).json({error: 'El post no existe'})
        }

        movie.likes = movie.likes + 1

        await movie.save()

        return res.status(200).json({ movie })

    }catch(error){
        return res.status(500).json({error})
    }
}

const views = async (req, res) => {
    try{

        const { postId } = req.body

        const post = await models.movie.findByIdAndUpdate( postId, {$inc:{views:1}}, {new: true})

        return res.status(200).json({ post })

        

    }catch(error){
        return res.status(400).json({erorr: 'No se han podido actuaizar las views'})
    }
}


const postRecientes = async (req, res) => {
    try{

        const movies = await models.movie.find().populate("user").sort({ createdAt: "desc"}).limit(2)
    
        return res.status(200).json({ movies })

    } catch (error){
        return res.status(500).json({error: 'No ha sido posible obtener las películas'})
    }
}


const getOne = async (req, res) => {
    try{

        const {id} = req.params

        const movie = await models.movie.findById(id).populate("user")

        return res.status(200).json({ movie })


    }catch(error){
        return res.status(500).json({error: 'No ha sido posible obtener la información de la película'})
    }
}


const update = async (req,res) => {
    try{

        const {id} = req.params
        const { title, director, description, score, image, owner } = req.body;

        const movie = await models.movie.findById(id)

        movie.title = title
        movie.director = director
        movie.description = description
        movie.score = score
        movie.image = image
        movie.owner = owner

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

const stats = async(req, res) => {
    try{

        const movies = await models.movie.countDocuments()

        console.log(movies)

        return res.status(202).json({ movies })


    }catch(error){
        return res.status(404).json({error: 'No se pudo acceder a los datos de Stats'})
    }
}


module.exports = {
    create,
    getAll,
    explorar,
    getOne,
    postRecientes,
    update,
    remove,
    stats,
    likes,
    views,
    duplicate
}