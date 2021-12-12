const { Schema, model } = require('mongoose');

const movieSchema = new Schema({

    title: {
        type: String,
        required: true,
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
        default: "0",
        required: true,
    },


    image: {
        type: String,
        required: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    post: {
        type: String,
        required: true,
    },

    likes: {
        type: Number,
        default: '0',
    },

    views: {
        type: Number,
        default: '1',
    }

},{
    timestamps: true,
    versionKey: false
})

module.exports = model('Movie', movieSchema)