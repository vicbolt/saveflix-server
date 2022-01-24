const { Schema, model } = require('mongoose');

const msgSchema = new Schema({

    userOne: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    userTwo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    content: {
        type: String,
        required: true
    }

},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Msg', msgSchema)