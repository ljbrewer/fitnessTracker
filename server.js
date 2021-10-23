const express= require("express");
const mongojs = require("mongojs");
const path = require('path');
const logger = require("morgan");
const mongoose = require("mongoose");
// require('dotenv').config();
// const session = require('express-session');
// const exphbs = require('express-handlebars');
// const routes = require('./controllers');
// const helpers = require('./utils/helpers');
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "fitnessTracker";
const collections = ["exercises"];

const db = mongojs(databaseUrl, collections);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessTracker", {
    useNewUrlParser: true,
    useFindAndModify: false
});

db.on("error", error => {
    console.log("Database Error:", error);
});

app.get("/", (req, res) => {
    res.sendfile(path.join(_dirname, "public", index.html))
});

app.get("/exercise", (req, res) => {
    res.sendfile(path.join(_dirname, "public", "exercise.html"))
});

app.get("/stats", (req, res) => {
    res.sendfile(path.join(_dirname, "public", "stats.html"))
});

//API Routes
app.get("api/workouts", async (req, res) => {
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

app.put("api/workouts/:id", (req, res) => {
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