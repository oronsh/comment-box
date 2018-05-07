const mongoose = require('mongoose');
const { validateEmail } = require('../helpers');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: (value) => {
                return validateEmail(value);
            },
            message: '{VALUE} is not a valid email'
        },
        required: [true, 'Email is required']
    },
    message: {
        type: String,
        required: [true, 'Message cannot be empty']
    },
}, {
    timestamps: true
});

const Comment = mongoose.model('comment', CommentSchema);


module.exports = Comment;