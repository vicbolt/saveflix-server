const { Schema, model } = require('mongoose');

const movieSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },

    director: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    score: {
        type: Number,
        required: true,
    },

    image: {
        type: File,
        required: true,
    },

    owner: {
        type: String,
        required: true
    },

    likes: {
        type: Number,
        default: '0',
    },

    views: {
        type: Number,
        default: '0',
    }

},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Movie', movieSchema)