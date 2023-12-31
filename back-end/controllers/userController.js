const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

// login user
const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.login(username, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({username, program: user.program, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const registerUser = async (req, res) => {
    const {username, email, program, password} = req.body

    try {
        const user = await User.register(username, email, program, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({username, program, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, registerUser}