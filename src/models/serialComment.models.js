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

    post: {
        type: Schema.Types.ObjectId,
        ref: 'Serial'
    }

},{
    timestamps: true,
    versionKey: false,
})


module.exports = model('Comment', commentSchema)