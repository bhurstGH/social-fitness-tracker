const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register new user
router.post("/users", (req, res) => {
  // Destructure request body
  const { username, email, password } = req.body;

  // Check that the fields existed
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields required." });
  }

  // Check that the email address isn't already in use
  User.findOne({
    email
  }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "Email already in use." });
    }

    // bcrypt to encrypt the password before it is saved to the DB
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;

        // Create and save user to DB
        User.create({
          username,
          email,
          password: hash
        })
          .then(user => {
            res.status(200).json({
              user
            });
          })
          .catch(err => {
            res.status(400).json({
              msg: err
            });
          });
      });
    });
  });
});

module.exports = router;
