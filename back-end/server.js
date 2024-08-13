require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const courseRouter = require('./routes/courses');
const reviewRouter = require('./routes/reviews');
const userRouter = require("./routes/user");
const cors = require("cors");

// express app
const app = express();

const allowedOrigins = [
    `http://localhost:${process.env.FRONTEND_PORT}`,
    `http://127.0.0.1:${process.env.FRONTEND_PORT}`,
    `http://${process.env.HOST}:${process.env.FRONTEND_PORT}`
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use("/api/courses", courseRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/user", userRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("listening on port ", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
