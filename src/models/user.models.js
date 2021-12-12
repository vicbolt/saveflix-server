const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    avatar: {
        type: String,
        required: true,
    },

    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

},{
    timestamps: true,
    versionKey: false
})

module.exports = model('User', userSchema)