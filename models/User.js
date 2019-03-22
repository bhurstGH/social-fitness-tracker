const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username required."],
    minLength: [6, "Username must be at least 6 characters long."],
    maxLength: [25, "Username canot be longer than 25 characters."],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email address required"],
    unique: [true, "That email address is already in use."]
  },
  password: {
    type: String,
    required: [true, "Password required."],
    minxLength: [6, "Password must be at least 6 characters long."]
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("User", UserSchema);
