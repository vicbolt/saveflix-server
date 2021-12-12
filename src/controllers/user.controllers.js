const models = require('../models');
const helpers = require('../helpers')
const jwt = require('jsonwebtoken');
const config = require('../config');
const { model } = require('mongoose');


// REGISTRO DEL USUARIO

const signUp = async (req,res) => {
    try{
        const { email, username, password, password2 } = req.body

        if(!email || !username || !password || !password2){
            return res.status(400).json({ error: 'Se deben de rellenar todos los campos'})
        }

        const userExists = await models.user.findOne({ email })
        if(userExists){
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' })
        }

        const usernameExists = await models.user.findOne({username})
        if(usernameExists){
            return res.status(400).json({error: 'El nombre de usuario no está disponible, inténtelo con uno diferente'})
        }

        if(password !== password2){
            return res.status(400).json({ error: 'Las contraseñas no coinciden'})
        }

        const hash = await helpers.bcrypt.encrypt(password)

        const mayusUsername = username.toUpperCase()

        const file = req.file
        const hostname = config.hostname
        
        const user = { 
            avatar: hostname + file.filename,
            email, 
            username: mayusUsername,
            password: hash
        }

        const data = await models.user.create(user)

        return res.status(201).json({ data })

    } catch(error) {

        return res.status(500).json({ error: 'No ha sido posible registrar al usuario' });
    }
}


// INICIO DE SESIÓN DEL USUARIO

const login = async (req, res) => {
    try{

        const { email, password } = req.body

        const user = await models.user.findOne({ email })
        if(!user){
            return res.status(400).json({ error: 'El correo electrónico no está registrado'})
        }

        const isValid = await helpers.bcrypt.compare(password, user.password)
        if(!isValid){
            return res.status(400).json({ error: 'La contraseña es incorrecta'})
        }

        const token = await jwt.sign({user}, config.jwt.secret)

        return res.status(200).json({token, userId: user._id})
        

    }catch(error){

        return res.status(500).json({ error: 'No ha sido posible iniciar sesión' });
    }
}

//OBTENER TODOS LOS USUARIOS

const getAll = async (req, res) => {
    try{
        const users = await models.user.find().populate("following")

        return res.status(200).json({users})

    }catch(error){
        return res.status(500).json({ error: 'No se han podido obtener los usuario'})
    }
}

//OBTENER UN USUARIO POR ID

const getOne = async (req, res) => {
    try{

        const {id} = req.params
        const user = await models.user.findById(id)

        return res.status(200).json({user})

    }catch(error){
        return res.status(500).json({error: 'No ha sido posible obtener el usuario'})
    }
}

//SEGUIR A UN AMIGO

const follow = async (req,res) => {
    try{

        const {ownerId} = req.body

        const userToFollowId = await models.user.findById(ownerId)
        if(!userToFollowId){
            return res.status(400).json({error: 'El usuario que intenta seguir no existe'})
        }

        const {userId} = req.body

        const myUserId = await models.user.findById(userId)


        if(myUserId.following.includes(userToFollowId._id)){

            const following = myUserId.following

            const index = following.indexOf(userToFollowId._id)

            console.log(index)

            const updated = following.splice(index, 1)

            await myUserId.save()

            console.log(updated)

            return res.status(200).json({error: 'Has dejado de seguir al usuario'})
        } 

        myUserId.following.push(userToFollowId)

        await myUserId.save()

        return res.json(myUserId.following)
    
    
    }catch(error){
        return console.log(error)
    }
}

//OBTENER LOS SEGUIDORES

const followers = async (req,res) => {
    try{

        const {id} = req.params

        const seguidores = await models.user.find({following: id})

        return res.status(200).json({seguidores})

    }catch(error){
        return res.json(error)
    }
}

// SIGUIENDO A:

const following = async (req,res) => {
    try{

        const {id} = req.params

        const user = await models.user.findById(id).populate("following")

        const seguidores = user.following


        return res.status(200).json({seguidores})

    }catch(error){
        return res.json(error)
    }
}

//ACTUALIZAR UN USUARIO

const update = async (req, res) => {
    try{
        const { id } = req.params
        const { email, username, password } = req.body

        const mayusUsername = username.toUpperCase()
        const mayusEmail = email.toUpperCase()

        const user = await models.user.findById(id)
        
        if(!username){
            user.username = user.username
        } else {
            const usernameExists = await models.user.findOne({username: mayusUsername})
            if(usernameExists){
                return res.status(400).json({ error: 'El nombre de usuario no está disponible'})
            }
        }

        if(user.email === email|| !email){
            user.email = user.email
        } else {
            const emailExists = await models.user.findOne({email})
            if(emailExists){
                return res.status(400).json({ error: 'El email ya ha sido registrado anteriormente'})
            }
        }

        if(!password){
            user.password = user.password
        } else {
            user.password = await helpers.bcrypt.encrypt(password)
        }

        await user.update({email, username: mayusUsername, password })
        return res.status(200).json({user})

    } catch(error){
        return res.status(500).json({ error: 'No ha sido posible actualizar los datos del usuario'})
    }
    
}

//BORRAR UN USUARIO

const remove = async (req, res) => {
    try{

        const {id} = req.params

        const user = await models.user.findByIdAndRemove(id)

        return res.status(200).json({user})

    }catch (error){
        return res.status(500).json({error: 'No ha sido posible eliminar el usuario'})
    }
}

module.exports = {
    signUp,
    login,
    getAll,
    getOne,
    update,
    remove,
    follow,
    followers,
    following,
}