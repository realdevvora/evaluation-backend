const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

const requireAuth = async (req, res, next) => {

    // verify authentication
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({error: "Authorization token required"})
    }

    const token = authorization.split(" ")[1] // string is "Bearer <token>"

    try {
        // if successfull
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select("_id")
        next()

    } catch (err) {
        // if fails
        console.log(err)
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireAuth