const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

router.get("/exercises", (req, res) => {
  Exercise.find({})
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
});

module.exports = router;
