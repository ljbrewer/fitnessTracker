const express= require("express");
const path = require('path');
const logger = require("morgan");
const mongoose = require("mongoose");
const Workout = require('./models/Workout')
require('dotenv').config();

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});



app.get("/", (req, res) => {
    res.sendfile(path.join("/public/index.html"))
});

app.get("/exercise", (req, res) => {
    res.sendfile(path.join("/public/exercise.html"))
});

app.get("/stats", (req, res) => {
    res.sendfile(path.join("/public/stats.html"))
});

//API Routes
app.get("/api/workouts", async (req, res) => {
    try {
        const workout = await Workout.find().sort({ day: -1 }).limit(1)

        res.json(workout)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
});

app.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then(dbworkout => {
            res.json(dbworkout)
        }).catch(err => res.json(err))
})

app.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne({ _id: req.params.id }, {
        $push: { exercises: req.body }
    })
        .then(dbworkout => {
            res.json(dbworkout)
        }).catch(err => res.json(err))
});

app.listen(3000, () => {
    console.log("App running on port 3000!");
});