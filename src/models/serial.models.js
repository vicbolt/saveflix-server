const { Schema, model } = require('mongoose');

const serialSchema = new Schema({

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
        required: true,
        default: "0"
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

module.exports = model('Serial', serialSchema)