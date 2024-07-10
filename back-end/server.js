require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const courseRouter = require('./routes/courses')
const reviewRouter = require('./routes/reviews')
const userRouter = require("./routes/user")
const cors = require("cors")


// express app
const app = express()


app.use(cors({
    origin: process.env.HOST
}));

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use("/api/courses", courseRouter)

app.use("/api/reviews", reviewRouter)

app.use("/api/user", userRouter)



mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log("listening on port ", process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})