const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of routine required."],
    trim: true
  },
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }]
});

module.exports = Routine = mongoose.model("Routine", RoutineSchema);
