const models = require('../models')


const createMsg = async (req,res) => {
    try{
        const { userOne, userTwo, content } = req.body;

        const user1 = await models.user.findById(userOne)
        if(!user1){
            return res.status(400).json({error: 'El usuario no existe'})
        }

        const user2 = await models.user.findById(userTwo)
        if(!user2){
            return res.status(400).json({error: 'El usuario no existe'})
        }

        if(!content){
            return res.status(400).json({error: "Escribe un mensaje para enviarlo"})
        }

        const mensaje = await models.msg.create({
            userOne: user1,
            userTwo: user2,
            content
        })

        return res.status(200).json({ mensaje })

    }catch(error){
        return res.status(500).json({error: 'No se ha podido enviar el mensaje'})
    }
}

const getMsg = async (req,res) =>{
    try{

        const { userOne, userTwo } = req.params;
        
        const mensajes1 = await models.msg.find({userOne : userOne, userTwo : userTwo})

        const mensajes2 = await models.msg.find({userOne : userTwo , userTwo : userOne})

        const mensajesA = mensajes1.concat(mensajes2)

        const mensajes = mensajesA.sort()

        return res.status(200).json(mensajes)

    }catch(error){
        return res.status(500).json({error: "No ha sido posible obtener los mensajes"})
    }
}

module.exports = {
    createMsg,
    getMsg,
}