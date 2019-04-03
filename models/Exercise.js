const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of exercise required."],
    trim: true
  }
});

module.exports = Exercise = mongoose.model("Exercise", ExerciseSchema);
