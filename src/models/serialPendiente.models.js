const { Schema, model } = require('mongoose');

const serialPendienteSchema = new Schema({

    title: {
        type: String,
        required: true,
    },

    director: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


    post: {
        type: String,
        required: true,
    },

},{
    timestamps: true,
    versionKey: false
})

module.exports = model('SerialPendiente', serialPendienteSchema)