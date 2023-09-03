const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    distribution: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('Course', courseSchema)