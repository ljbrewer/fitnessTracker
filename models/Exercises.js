const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  day: Date,
  excercise: {
    type: String,
    name: String,
    trim: true,
    duration: INTEGER,
    weight: INTEGER,
    reps: INTEGER,
    sets: INTEGER,
    required: "Enter a name for exercise"
  },
});

const Exercises = mongoose.model("Exercises", exerciseSchema);

module.exports = Exercises;
