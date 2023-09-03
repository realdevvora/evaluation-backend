const CourseModel = require('../models/CourseModel')
const mongoose = require('mongoose')

// get all courses
const getCourses = async (req, res) => {

    const courses = await CourseModel.find({})

    res.status(200).json(courses)
}

// get single course
const getCourse = async (req, res) => {
    
    const {id} = req.params

    // checks if the ID sent is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such course"})
    }

    const course = await CourseModel.findById(id)
    if (!course) {
        return res.status(400).json({error: "NO course found"})
    }

    res.status(200).json(course)
}

// post course
const createCourse = async (req, res) => {

    const {title, distribution, difficulty} = req.body

    try {
        // create table in db with following columns
        const course = await CourseModel.create({title, distribution, difficulty})
        // send success message with data sent
        res.status(200).json(course)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}




module.exports = {getCourses, getCourse, createCourse}