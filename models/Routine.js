const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: [true, "Name of routine required."],
    trim: true
  },
  exercises: []
});

module.exports = Routine = mongoose.model("Routine", RoutineSchema);
