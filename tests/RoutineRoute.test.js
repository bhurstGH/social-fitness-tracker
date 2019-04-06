require("dotenv").config();
const axios = require("axios");
const assert = require("assert").strict;
const User = require("../models/User");
const Routine = require("../models/Routine");
const base = "http://localhost:5000/";

describe.only("Routine routes", () => {
  const newUser = {
    username: "BobSwole",
    email: "bob@swole.com",
    password: "asdasd"
  };
  before(done => {
    axios
      .post(`${base}users/`, newUser)
      .then(res => {
        User.findById(res.user.data._id).then(user => {
          assert(user === newUser);
          done();
        });
      })
      .catch(err => done(err));
  });

  describe("POST /routines", () => {
    it("should create a new routine", done => {
      User.findOne({ email: newUser.email }).then(user => {
        let newRoutine = {
          user_id: user._id,
          name: "Bob Swole's Sick Routine!",
          exercises: ["Awesome", "Lifts", "Get Pumped"]
        };
        axios
          .post(`${base}routines/`, newRoutine)
          .then(res => {
            console.log(res);
            Routine.findById(res.routine.data._id).then(routine => {
              assert(routine === newRoutine);
              done();
            });
          })
          .catch(err => done(err));
      });
    });
  });
});
