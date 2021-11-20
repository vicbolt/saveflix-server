const { Schema, model } = require('mongoose')

const commentSchema = new Schema({

    message: {
        type: String,
        required: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    moviePost: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
    },

    serialPost: {
        type: Schema.Types.ObjectId,
        ref: 'Serial'
    }

},{
    timestamps: true,
    versionKey: false,
})


module.exports = model('Comment', commentSchema)