const models = require('../models')
const config = require('../config')

const create = async (req,res) => {

    try{
        const { title, director, description, score, userId, image } = req.body;

        const user = await models.user.findById(userId)
        if(!user){
            return res.status(400).json({error: 'El usuario no existe'})
        }

        if(!title || !director || !description || !score || !image){
            return res.status(400).json({error: "Todos los campos son obligatorios"})
        }

        const searchTitle = title.replace(/ /g, "").toUpperCase()

        const serial = await models.serial.create({
            title,
            searchTitle: searchTitle,
            director, 
            description, 
            score, 
            image,
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

        const searchTitleX = title.replace(/ /g, "").toUpperCase()

        const serial = await models.serial.create({
            title,
            searchTitle: searchTitleX,
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

        const serialRanking = await models.serial.find({userId: id}).sort({ score: 'desc'}).limit(15)

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

        const {postId, userId} = req.body

        const serial = await models.serial.findById(postId)
        if(!serial){
            return res.status(400).json({error: 'El post no existe'})
        }

        const user = await models.user.findById(userId)
        if (!user){
            return res.status(400).json({error: 'El usuario no existe'})
        }

        if(serial.likes.includes(userId)){

            const index = serial.likes.indexOf(userId)
            
            serial.likes.splice(index, 1)

            await serial.save()
            
            return res.status(200).json({serial})
            
        } else {

            serial.likes.push(user)
            await serial.save()
        }

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
        const { title, director, description, score, image, userId } = req.body;

        const serial = await models.serial.findById(id)

        const searchTitleX = title.replace(/ /g, "").toUpperCase()

        serial.title = title
        serial.searchTitle = searchTitleX
        serial.director = director
        serial.description = description
        serial.score = score
        serial.image = image
        serial.userId = userId

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