const express = require("express");
const router = express.Router();
const Routine = require("../models/Routine");

// Create new routine
router.post("/routines", (req, res) => {
  if (!req.user) {
    res.status(401).json({ msg: "You must be logged in to create a routine." });
    res.redirect("/");
  }
  const { routineName, routineDescription, routineExercises } = req.body;

  if (!routineName) {
    return res.status(400).json({ msg: "You must name the routine." });
  }

  Routine.create({
    user_id: req.user._id,
    name: routineName,
    description: routineDescription,
    exercises: routineExercises
  })
    .then(routine => {
      res.status(200).json(routine);
    })
    .catch(err => {
      let { message } = err.errors.username || err.errors.email;
      console.log(message);
      res.status(400).json({
        msg: message
      });
    });
});

// Update a routine
router.post("/routines/:id/update", (req, res) => {
  if (req.body.routineName) {
    Routine.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.routineNname
      },
      { new: true }
    )
      .then(routine => {
        console.log(routine);
        res.status(200).json({
          name: routine.name
        });
      })
      .catch(err => console.log(err));
  }
});

// Get user routines
router.get("/routines/:id", (req, res) => {
  Routine.find({ user_id: req.params.id })
    .then(routines => {
      res.json(routines);
    })
    .catch(err => console.log(err));
});

module.exports = router;
