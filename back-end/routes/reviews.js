const express = require('express')
const {createReview, getReviews, getReview, deleteReview, updateReview } = require('../controllers/reviewController')
const router = express.Router()


// get all course reviews
router.get('/', getReviews)

// get a single course review
router.get('/:id', getReview)

// post new course review
router.post('/', createReview)

// delete course review
router.delete('/:id', deleteReview)

// update course review
router.patch('/:id', updateReview)


module.exports = router