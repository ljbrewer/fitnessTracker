const express= require("express");
const path = require('path');
const logger = require("morgan");
const mongoose = require("mongoose");
const Workout = require('./models/Workout');
const { Router } = require("express");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});
// routes

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"))
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"))
});

//API Routes
app.get("/api/workouts", async (req, res) => {
    try {
       //const workout = await Workout.find().sort({ day: -1 }).limit(1)
        const workout = await Workout.aggregate([
        {
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration',
            },
          },
        }, 
    ])
        res.json(workout)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
});

app.get('/api/workouts/range', (req,res) => {
    Workout.aggregate([
        {
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration',
            },
          },
        }, 
    ])
    .then((dbWorkouts) =>{
        res.json(dbWorkouts);
    })
    .catch((err)=>{
        res.json(err);
    });
});

app.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then(dbworkout => {
            res.json(dbworkout)
        }).catch(err => res.json(err))
})

app.put("/api/workouts/:id", (req, res) => {
    console.log("====================")
    console.log(req.body)
    console.log("=========")
Workout.findByIdAndUpdate( req.params.id , {
        $push: { exercises: req.body },
    })
        .then(dbworkout => {
            console.log(dbworkout)
            res.json(dbworkout)
        }).catch(err => res.json(err))
});

app.listen(3000, () => {
    console.log("App running on port 3000!");
});