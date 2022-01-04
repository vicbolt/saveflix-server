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

        const serial = await models.serial.create({
            title,
            director, 
            description, 
            score, 
            image: filename, 
            userId: user,
            post: "serial"
        })

        return res.status(200).json({ serial })

    } catch(error) {
        return res.status(500).json({ error: 'No se ha podido crear la publicación' })
    }
}

const duplicate = async (req,res) => {
    try{
        const { title, director, description, score, userId, image } = req.body;


        const user = await models.user.findById(userId)
        if(!user){
            return res.status(400).json({error: 'El usuario no existe'})
        }

        const serial = await models.serial.create({
            title,
            director, 
            description, 
            score, 
            image,
            userId: user,
            post: "serial"
        })

        return res.status(200).json({ serial })

    }catch(error){
        return res.status(500).json({error: 'No se ha podido crear la publicación'})
    }
}

const getAll = async (req,res) => {
    
    try{

        const {id} = req.params

        const serials = await models.serial.find({userId: id}).sort({ createdAt: 'desc'})

        const serialRanking = await models.serial.find({userId: id}).sort({ score: 'desc'}).limit(10)

        return res.status(200).json({ serials, serialRanking })

    } catch (error){
        return res.status(500).json({ error: 'No ha sido posible obtener las películas' })
    }
}

const explorar = async (req,res) => {
    
    try{
        const serials = await models.serial.find().sort({ createdAt: 'desc'})

        return res.status(200).json({ serials })

    } catch (error){
        return res.status(500).json({ error: 'No ha sido posible obtener las películas' })
    }
}

const getOne = async (req, res) => {
    try{

        const {id} = req.params

        const serial = await models.serial.findById(id).populate("userId")

        return res.status(200).json({ serial })


    }catch(error){
        return res.status(500).json({error: 'No ha sido posible obtener la información de la serie'})
    }
}

const postRecientes = async (req, res) => {
    try{
        const serials = await models.serial.find().populate("userId").sort({ createdAt: "desc"}).limit(2)

        return res.status(200).json({ serials })

    } catch (error){
        return res.status(500).json({error: 'No ha sido posible obtener las series'})
    }
}


const likes = async (req,res) =>{
    try{

        const {postId} = req.body

        const serial = await models.serial.findById(postId)
        if(!serial){
            return res.status(400).json({error: 'El post no existe'})
        }

        serial.likes = serial.likes + 1

        await serial.save()

        return res.status(200).json({serial})

    }catch(error){
        return res.status(500).json({error: 'No ha sido posible la acción like'})
    }
}

const views = async (req, res) => {
    try{

        const { postId } = req.body

        const post = await models.serial.findByIdAndUpdate( postId, {$inc:{views:1}}, {new: true})

        return res.status(200).json({ post })

        

    }catch(error){
        return res.status(400).json({erorr: 'No se han podido actuaizar las views'})
    }
}

const update = async (req,res) => {
    try{

        const {id} = req.params
        const { title, director, description, score, image, owner } = req.body;

        const serial = await models.serial.findById(id)

        serial.title = title
        serial.director = director
        serial.description = description
        serial.score = score
        serial.image = image
        serial.owner = owner

        await serial.save()

        return res.status(200).json({serial})
        

    } catch(error){
        return res.status(500).json({error: 'No ha sido posible actualizar la serie'})
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

const stats = async(req, res) => {
    try{

        const serials = await models.serial.countDocuments()


        return res.status(202).json({ serials })

    }catch(error){
        return res.status(404).json({error: 'No se pudo acceder a los datos de Stats'})
    }
}


module.exports = {
    create,
    duplicate,
    getAll,
    explorar,
    getOne,
    postRecientes,
    likes,
    views,
    update,
    remove,
    stats
}