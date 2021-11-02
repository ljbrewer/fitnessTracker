const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: Date,
  excercise:[ {
    type: {
      type: String, 
      trim: true},
    name:{ 
      type: String,
      trim: true, 
      required: "Enter a name for the exercise"},
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    },
  ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
