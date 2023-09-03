const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    },
    program: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    difficulty: {
        type: Number,
        required: false
    },
    courseTitle: {
        type: String,
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Review', reviewSchema)