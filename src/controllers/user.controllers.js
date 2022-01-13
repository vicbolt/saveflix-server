const models = require('../models');
const helpers = require('../helpers')
const jwt = require('jsonwebtoken');
const config = require('../config');
const { model } = require('mongoose');
const movieModels = require('../models/movie.models');


// REGISTRO DEL USUARIO

const signUp = async (req,res) => {
    try{
        const { email, username, password, password2, avatar } = req.body

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

        const minusEmail = email.toLowerCase()

        const code = helpers.code.generate(6)
        
        const user = { 
            avatar,
            email: minusEmail,
            username: mayusUsername,
            password: hash,
            code: code
        }

        const content = 
        
        `<h1 style="color: #5e9ca0; text-align: center;"><span style="color: #ff0000;">SAVEFLIX</span></h1>
        <h1 style="color: #5e9ca0; text-align: center;"><span style="color: #000000;">Código de activación:</span></h1>
        <h1 style="text-align: center;"><span style="color: #ff0000;"><strong>${code}</strong></span></h1>
        <p style="text-align: center;">Para insertar su código y activar su cuenta pulse <span style="color: #ff0000; background-color: #ffffff;"><a style="color: #ff0000; background-color: #ffffff;" title="Activar Código" href="http://localhost:3000/activateCode" target="_blank">aquí.;</a></span></p>
        <p style="text-align: center;"><em>El código caduca 3 horas después de recibir este email.</em></p>
        <p style="text-align: center;"><em>Si su código ha caducado, puede pedirlo de nuevo en el siguiente enlace.</em></p>
        <p style="text-align: center;"><span style="background-color: #ffffff; color: #ff0000;"><a style="background-color: #ffffff; color: #ff0000;" title="Reenviar código" href="http://localhost:3000/reactivateCode" target="_blank" rel="noopener"><strong>Reenviar codigo</strong></a></span></p>`

        await helpers.mail.send(minusEmail, content, "¡Tu codigo de acceso a SaveFlix!")

        const data = await models.user.create(user)

        return res.status(201).json({ data })

    } catch(error) {

        return res.status(500).json({ error: 'No ha sido posible registrar al usuario' });
    }
}

//VALIDACION DEL CODIGO DE ACTIVACIÓN DE LA CUENTA

const activarCodigo = async(req, res) => {
    try{
        const { email, code } = req.body

        minusEmail = email.toLowerCase()

        const user = await models.user.findOne({ email: minusEmail })
        if(!user){
            return res.status(400).json({error: "El usuario no exíste"})
        }

        if(!code){
            return res.status(400).json({ error: "Debe introducir el código enviado a su correo electrónico"})
        }
        
        
        if(user.code !== code){
            return res.status(400).json({ error: "El código no es correcto, inténtelo de nuevo"})
        }

        const codeValidate = (date, hours) => {
            return new Date(new Date(date).setHours(date.getHours() + hours))
        }
        
        const HOURS = 1     
        const updatedAt = new Date(user.updatedAt)
        const now = new Date()
        const auxDate = codeValidate(updatedAt, HOURS)

        if(now.getTime() > auxDate.getTime()){
            return res.status(400).json({ error: "El código ha expirado"})
        }

        if(user.code === code){
            user.active = true
            await user.save()
        }

        return res.status(200).json({ user })

    } catch(error){

        return res.status(500).json({ error: "No ha sido posible activar el codigo"})
    }
    
}

//REENVIAR EL CODIGO SI HA EXPIRADO

const reactivarCodigo = async (req,res)=> {
    try{

        const { email } = req.body

        const minusEmail = email.toLowerCase()

        const user = await models.user.findOne({ email: minusEmail})

        if(!user){
            return res.status(400).json({error: "El usuario no existe"})
        }

        const content = `Code: ${user.code}`

        await helpers.mail.send(minusEmail, content, "¡Tu codigo de acceso a SaveFlix!")

        const now = new Date()

        await user.updateOne({updatedAt: now})

        return res.status(200).json({ user })

    }catch(error){
        return res.status(500).json({ error: "No ha sido posible reenviar el codigo"})
    }
}

// INICIO DE SESIÓN DEL USUARIO

const login = async (req, res) => {
    try{

        const { email, password } = req.body

        const minusEmail = email.toLowerCase()

        const user = await models.user.findOne({ email: minusEmail })
        if(!user){
            return res.status(400).json({ error: 'El correo electrónico no está registrado'})
        }

        if(user.active === false){
            return res.status(400).json({ error: "Active su cuenta para usar SaveFlix"})
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
        return res.status(500).json({ error: 'No se han podido obtener los usuarios'})
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

const search = async (req, res) => {
    try{

        const { username } = req.params

        const {userId} = req.body

        const mayusUsername = username.toUpperCase()

        const user = await models.user.findOne({ username : mayusUsername })
        if(!user){
            return res.status(200).json({error: "No hay ningún usuario registrado con este nombre"})
        }

        if(mayusUsername === userId){
            return res.status(200). json(user.username)
        }

        return res.status(200).json(user._id)


    }catch(error){
        return res.status(500).json({error: 'El título no ha sido subido aún, pruebe con otro título'})
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

const saveEmail = async (req, res) => {
    try{
        const { id } = req.params
        const {email} = req.body

        const user = await models.user.findById(id)

        const minusEmail = email.toLowerCase()
        
        if(!email){
            return res.status(400).json({error: 'Email debe estar relleno'})

        } else if(minusEmail === user.email){
            await user.update({email: user.email })

        } else {
            const emailExists = await models.user.findOne({email: minusEmail})
            if(emailExists){
                return res.status(400).json({ error: 'El email ya ha sido registrado anteriormente'})
            } else {

                const code = helpers.code.generate(6)

                const content = 
                
                    `<h1 style="color: #5e9ca0; text-align: center;"><span style="color: #ff0000;">SAVEFLIX</span></h1>
                    <h1 style="color: #5e9ca0; text-align: center;"><span style="color: #000000;">Código de activación:</span></h1>
                    <h1 style="text-align: center;"><span style="color: #ff0000;"><strong>${code}</strong></span></h1>
                    <p style="text-align: center;">Para insertar su código y activar su cuenta pulse <span style="color: #ff0000; background-color: #ffffff;"><a style="color: #ff0000; background-color: #ffffff;" title="Activar Código" href="http://localhost:3000/activateCode" target="_blank">aquí.;</a></span></p>
                    <p style="text-align: center;"><em>El código caduca 3 horas después de recibir este email.</em></p>
                    <p style="text-align: center;"><em>Si su código ha caducado, puede pedirlo de nuevo en el siguiente enlace.</em></p>
                    <p style="text-align: center;"><span style="background-color: #ffffff; color: #ff0000;"><a style="background-color: #ffffff; color: #ff0000;" title="Reenviar código" href="http://localhost:3000/reactivateCode" target="_blank" rel="noopener"><strong>Reenviar codigo</strong></a></span></p>`

                await helpers.mail.send(minusEmail, content, "¡Tu codigo de acceso a SaveFlix!")

                await user.update({code: code})
                
                
                // await user.update({email: minusEmail, active: false})
                return res.status(200).json({user})
 
            }
        }

        return res.status(200).json({user})

    } catch(error){
        return res.status(500).json({ error: 'No ha sido posible actualizar los datos del usuario'})
    }
    
}

const activarEmail = async(req, res) => {
    try{
        const { email, code, oldEmail } = req.body

        minusEmail = oldEmail.toLowerCase()

        const user = await models.user.findOne({ email: minusEmail })
        if(!user){
            return res.status(400).json({error: "El usuario no exíste"})
        }

        if(!code){
            return res.status(400).json({ error: "Debe introducir el código enviado a su correo electrónico"})
        }
        
        
        if(user.code !== code){
            return res.status(400).json({ error: "El código no es correcto, inténtelo de nuevo"})
        }

        const codeValidate = (date, hours) => {
            return new Date(new Date(date).setHours(date.getHours() + hours))
        }
        
        const HOURS = 1     
        const updatedAt = new Date(user.updatedAt)
        const now = new Date()
        const auxDate = codeValidate(updatedAt, HOURS)

        if(now.getTime() > auxDate.getTime()){
            return res.status(400).json({ error: "El código ha expirado"})
        }

        if(user.code === code){
            user.email = email
            await user.save()
        }

        return res.status(200).json({ user })

    } catch(error){

        return res.status(500).json({ error: "No ha sido posible activar el nuevo email"})
    }
    
}

const reactivarEmail = async (req,res)=> {
    try{

        const { email, oldEmail } = req.body

        const minusEmail = oldEmail.toLowerCase()

        const user = await models.user.findOne({ email: minusEmail})

        if(!user){
            return res.status(400).json({error: "El usuario no existe"})
        }

        const content = `Code: ${user.code}`

        await helpers.mail.send(email, content, "¡Tu codigo de acceso a SaveFlix!")

        const now = new Date()

        await user.updateOne({updatedAt: now})

        return res.status(200).json({ user })

    }catch(error){
        return res.status(500).json({ error: "No ha sido posible reenviar el codigo"})
    }
}

const saveUsername = async (req, res) => {
    try{
        const { id } = req.params
        const {username} = req.body

        const mayusUsername = username.toUpperCase()

        const user = await models.user.findById(id)
        
        //USERNAME
        if(!username){
            return res.status(400).json({error: 'Nombre de usuario debe estar relleno'})

        } else if(mayusUsername === user.username){
            await user.update({username: user.username })
        } else {
            const usernameExists = await models.user.findOne({username: mayusUsername})
            if(usernameExists){
                return res.status(400).json({ error: 'El nombre de usuario no está disponible'})
            } else {
                await user.update({username: mayusUsername })
            }
        }

        return res.status(200).json({user})

    } catch(error){
        return res.status(500).json({ error: 'No ha sido posible actualizar los datos del usuario'})
    }
    
}

const savePassword = async (req, res) => {
    try{
        const { id } = req.params
        const {password, newPassword, newPassword2} = req.body

        const user = await models.user.findById(id)
        

        if(!password){
            return res.status(400).json({error: 'Debe elegir una contraseña'})
        }
        
        const isValid = await helpers.bcrypt.compare(password, user.password)

        if(!isValid){
            return res.status(400).json({error: 'La contraseña actual no coincide'})
        }

        if(newPassword === newPassword2){
            const hash = await helpers.bcrypt.encrypt(newPassword)
            await user.update({password: hash })
        }

        return res.status(200).json({user})

    } catch(error){
        return res.status(500).json({ error: 'No ha sido posible actualizar los datos del usuario'})
    }
    
}

const saveAvatar = async (req, res) => {
    try{
        const { id } = req.params
        const { avatar } = req.body

        const user = await models.user.findById(id)

        if(!avatar){
            return res.status(400).json('El avatar está vacío, elija uno para continuar')
        }

        const newAvatar = avatar

        await user.update({avatar: newAvatar })

        return res.status(200).json({user})

    } catch(error){
        return res.status(500).json({ error: 'No ha sido posible actualizar los datos del usuario'})
    }
    
}

//BORRAR UN USUARIO

const remove = async (req, res) => {
    try{

        const {id} = req.params

        const user = await models.user.findById(id)
        if(!user){
            return res.status(205).json({ error: "El usuario no existe "})
        }

        //BORRADO DE TODOS LOS COMENTARIOS DE PELICULAS QUE HA SUBIDO DEL USER QUE VA A SER ELIMINADO
        const movies = await models.movie.find({ userId: user._id })

        for(var i = 0; i < movies.length ; i++){
           await models.movieComment.remove({ postId: movies[i]._id })
        }

        //BORRADO DE COMENTARIOS QUE HA HECHO EL USUARIO QUE VA A SER ELIMINADO
        await models.movieComment.remove({ user: user._id})

        //BORRADO DE LAS PELICULAS QUE HA SUBIDO EL USUARIO ELIMINADO
        await models.movie.remove({ userId: user._id})

        //BORRADO DE LAS PELICULAS PENDIENTES QUE HA SUBIDO EL ELIMINADO
        await models.moviePendiente.remove({ userId: user._id})


        //BORRADO DE TODOS LOS COMEMTARIOS DE SERIES QUE HA SUBIDO EL USER QUE VA A SER ELIMINADO
        const serial = await models.serial.find({ userId: user._id })

        for(var i = 0; i < serial.length ; i++){
           await models.serialComment.remove({ postId: serial[i]._id })
        }
        
        //BORRADO DE LOS COMENTARIOS QUE HA HECHO EL USER ELIMINADO
        await models.serialComment.remove({ user: user._id})

        //BORRADO DE LAS SERIES QUE HA SUBIDO EL ELIMINADO
        await models.serial.remove({ userId: user._id})

        //BORRADO DE LAS SERIES PENDIENTES QUE HA SUBIDO EL ELIMINADO
        await models.serialPendiente.remove({ userId: user._id})
        
        //BORRADO DE LOS DATOS DE USUARIO DEL ELIMINADO
        await models.user.findByIdAndRemove(id)

        return res.status(200).json({msg: "Se han borrado todos los datos del usuario"})

    }catch (error){
        return res.status(500).json({error: 'No ha sido posible eliminar el usuario'})
    }
}


module.exports = {
    signUp,
    activarCodigo,
    reactivarCodigo,
    login,
    getAll,
    getOne,
    search,
    saveEmail,
    activarEmail,
    reactivarEmail,
    savePassword,
    saveAvatar,
    saveUsername,
    remove,
    follow,
    followers,
    following,
}