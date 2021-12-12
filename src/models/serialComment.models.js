const { Schema, model } = require('mongoose')

const serialCommentSchema = new Schema({

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
        ref: 'Serial',
        required: true
    },

},{
    timestamps: true,
    versionKey: false,
})


module.exports = model('SerialComment', serialCommentSchema)