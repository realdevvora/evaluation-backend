const ReviewModel = require('../models/ReviewModel')
const mongoose = require('mongoose')

// get all reviews
const getReviews = async (req, res) => {

    const reviews = await ReviewModel.find({}).sort({createdAt: -1})

    res.status(200).json(reviews)
}

// get single review
const getReview = async (req, res) => {
    
    const {id} = req.params

    // checks if the ID sent is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such review"})
    }

    const review = await ReviewModel.findById(id)
    if (!review) {
        return res.status(400).json({error: "NO review found"})
    }

    res.status(200).json(review)
}

// post new review
const createReview = async (req, res) => {

    const {title, author, message, program, rating, difficulty, courseTitle} = req.body

    try {
        const user_id = req.user_id
        // create table in db with following columns
        const review = await ReviewModel.create({title, author, message, program, rating, difficulty, courseTitle, user_id})
        // send success message with data sent
        res.status(200).json(review)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// delete review
const deleteReview = async (req, res) => {
    const {id} = req.params

    // checks if the ID sent is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such review"})
    }

    const deleted = await ReviewModel.findOneAndDelete({_id: id})

    if (!deleted) {
        return res.status(400).json({error: "No such review"})
    }

    res.status(200).json(deleted)

}

// update review
const updateReview = async (req, res) => {
    const {id} = req.params

    // checks if the ID sent is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such review"})
    }

    // update review by using the request properties
    const review = await ReviewModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    
    if (!review) {
        return res.status(400).json({error: "No such review"})
    }
    
    res.status(200).json(review)
}


module.exports = {createReview, getReviews, getReview, deleteReview, updateReview}