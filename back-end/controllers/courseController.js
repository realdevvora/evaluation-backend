const CourseModel = require('../models/CourseModel')
const mongoose = require('mongoose')

// get all courses
const getCourses = async (req, res) => {

    const courses = await CourseModel.find({})

    await res.status(200).json(courses)
}

// get single course
const getCourse = async (req, res) => {
    
    const {id} = req.params

    // checks if the ID sent is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return await res.status(404).json({error: "No such course"})
    }

    const course = await CourseModel.findById(id)
    if (!course) {
        return await res.status(400).json({error: "No course found"})
    }

    await res.status(200).json(course)
}

// post course
const createCourse = async (req, res) => {

    const {title, distribution, difficulty} = req.body

    try {
        // create table in db with following columns
        const course = await CourseModel.create({title, distribution, difficulty})
        // send success message with data sent
        await res.status(200).json(course)
    } catch (err) {
        await res.status(400).json({error: err.message})
    }
}

const deleteCourse = async (req, res) => {
    const course = req.params // object
    if (course) {
        await res.status(200).json(course)
    } else {
        await res.status(400).json({error: err.message})
    }
}

module.exports = {getCourses, getCourse, createCourse, deleteCourse}