const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

// Register new user
router.post("/users", (req, res) => {
  // Destructure request body
  const { username, email, password, confirmpass } = req.body;

  // Check that the fields existed
  if (!username || !email || !password || !confirmpass) {
    return res.status(400).json({ msg: "All fields required." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters." });
  }

  if (password !== confirmpass) {
    return res.status(400).json({ msg: "Passwords do not match." });
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
              id: user._id,
              username: user.username,
              email: user.email
            });
          })
          .catch(err => {
            let { message } = err.errors.username || err.errors.email;
            console.log(message);
            res.status(400).json({
              msg: message
            });
          });
      });
    });
  });
});

// Login Route
router.post(
  "/users/login",
  passport.authenticate("local", { failWithError: true }),
  (req, res) => {
    res.json(req.user);
  },
  (err, req, res, next) => {
    if (req.authError) {
      res.status(400).json({
        msg: req.authError
      });
    }
  }
);

// Update user
router.post("/users/:id/update", (req, res) => {
  // Update username
  if (req.body.username) {
    User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username
      },
      { new: true }
    )
      .then(user => {
        console.log(user);
        res.status(200).json({
          username: user.username
        });
      })
      .catch(err => console.log(err));
  }
});

// router.get("/users", (req, res) => {
//   if (req.user) {
//     return res.json(req.user);
//   }
// });

// Logout
router.get("/users/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
