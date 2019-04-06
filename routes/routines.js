const express = require("express");
const router = express.Router();
const Routine = require("../models/Routine");

router.post("/routines", (req, res) => {
  if (!req.user) {
    res.status(401).json({ msg: "You must be logged in to create a routine." });
    res.redirect("/");
  }
  const { routineName, exercises } = req.body;

  if (!routineName) {
    return res.status(400).json({ msg: "You must name the routine." });
  }

  Routine.create({
    user_id: req.user._id,
    name: routineName,
    exercises: exercises
  })
    .then(routine => {
      res.status(200).json({
        id: routine._id,
        user_id: routine.user_id,
        name: routine.name,
        exercises: routine.exercises
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

module.exports = router;
