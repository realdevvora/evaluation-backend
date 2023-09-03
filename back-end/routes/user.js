const express = require("express")
const router = express.Router()

//controller functions
const {loginUser, registerUser} = require("../controllers/userController")

// login route:
router.post("/login", loginUser)


// sign-up route:
router.post("/register", registerUser)


module.exports = router