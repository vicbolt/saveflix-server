const models = require('../models');
const helpers = require('../helpers')
const jwt = require('jsonwebtoken');
const config = require('../config');


// REGISTRO DEL USUARIO

const signUp = async (req,res) => {
    try{
        const { email, password, password2 } = req.body

        if(!email || !password || !password2){
            return res.status(400).json({ error: 'Se deben de rellenar todos los campos'})
        }

        const userExists = await models.user.findOne({ email })
        if(userExists){
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' })
        }

        if(password !== password2){
            return res.status(400).json({ error: 'Las contraseñas no coinciden'})
        }

        const hash = await helpers.bcrypt.encrypt(password)
        
        const user =  models.user({ email, password: hash })

        await user.save()

        return res.status(201).json({ user })

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
            return res.status(400).json('La contraseña es incorrecta')
        }

        const token = await jwt.sign({user}, config.jwt.secret)

        return res.status(200).json(token)
        

    }catch(error){

        return res.status(500).json({ error: 'No ha sido posible iniciar sesión' });
    }
}

//OBTENER TODOS LOS USUARIOS

const getAll = async (req, res) => {
    try{
        const users = await models.user.find()

        return res.status(200).json({users})

    }catch(error){
        return res.status(500).json({ error: 'No se han podido obtener los usuario'})
    }
}

//ACTUALIZAR UN USUARIO

const update = async (req, res) => {
    try{
        const { id } = req.params
        const { email, password } = req.body

        const user = await models.user.findById(id)
        user.email = email
        user.password = await helpers.bcrypt.encrypt(password)

        await user.save()
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
    update,
    remove
}