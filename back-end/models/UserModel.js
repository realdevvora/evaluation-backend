const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    program: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

// static register method
userSchema.statics.register = async function(username, email, program, password) {
    // validation
    if (!username || !email || !program || !password) {
        throw Error("All fields must be filled")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough")
    }


    const exists = await this.findOne({username})
    const exists2 = await this.findOne({email})

    if (exists) {
        throw Error("username already in use")
    }
    if (exists2) {
        throw Error("email already in use")
    }

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, email, program, password: hash})

    return user
}

userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({username})

    if (!user) {
        throw Error("Incorrect username")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect password")
    }

    return user
}

module.exports = mongoose.model("User", userSchema)