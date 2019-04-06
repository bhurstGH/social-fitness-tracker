require("dotenv").config();
const assert = require("assert").strict;
const Routine = require("../models/Routine");
const User = require("../models/User");
const mongoose = require("mongoose");

describe("Routine model", () => {
  let dummyExercises = [
    {
      name: "Exercise 1"
    },
    {
      name: "Exercise 2"
    },
    {
      name: "Exercise 3"
    },
    {
      name: "Exercise 4"
    },
    {
      name: "Exercise 5"
    }
  ];

  let routineUser = {
    username: "BobSwole",
    email: "bob@swole.com",
    password: "password"
  };

  let { collectionName } = Routine.collection;

  before(done => {
    mongoose
      .connect(process.env.MONGO_TEST_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => {
        User.create(routineUser).then(user => {
          console.log(`${user.email} created`);
          console.log("MongoDB connected");
          done();
        });
      })
      .catch(err => {
        console.log(err);
      });
  });

  beforeEach(done => {
    mongoose.connection.dropCollection(collectionName, () => {
      console.log("Collection cleared.");
      done();
    });
  });

  it("should create a new routine with no exercises", done => {
    User.findOne({ email: routineUser.email }).then(user => {
      Routine.create({
        user_id: user._id,
        name: "Bob Swole's Awesome Workout Routine"
      })
        .then(routine => {
          // isNew property will be false after user is saved to DB
          assert(!routine.isNew);
          done();
        })
        .catch(err => console.log(err));
    });
  });

  it("should create a new routine with exercises", done => {
    User.findOne({ email: routineUser.email }).then(user => {
      let exercises = dummyExercises.map(exercise => exercise.name);
      Routine.create({
        user_id: user._id,
        name: "Bob Swole's Awesome Workout Routine",
        exercises
      })
        .then(routine => {
          assert(!routine.isNew);
          assert(routine.exercises[0] === "Exercise 1");
          assert(routine.exercises.length === 5);
          done();
        })
        .catch(err => console.log(err));
    });
  });

  it("should add a new exercise to the routine", done => {
    User.findOne({ email: routineUser.email }).then(user => {
      let exercises = dummyExercises.map(exercise => exercise.name);
      Routine.create({
        user_id: user._id,
        name: "Bob Swole's Awesome Workout Routine",
        exercises
      }).then(routine => {
        assert(routine.exercises[4] === "Exercise 5");
        assert(routine.exercises.length === 5);
        routine.exercises.push("Exercise 6");
        routine.save().then(() => {
          Routine.findOne({ _id: routine._id })
            .then(updatedRoutine => {
              assert(updatedRoutine.exercises.length === 6);
              done();
            })
            .catch(err => console.log(err));
        });
      });
    });
  });

  it("should remove an exercise to the routine", done => {
    User.findOne({ email: routineUser.email }).then(user => {
      let exercises = dummyExercises.map(exercise => exercise.name);
      Routine.create({
        user_id: user._id,
        name: "Bob Swole's Awesome Workout Routine",
        exercises
      }).then(routine => {
        assert(routine.exercises[2] === "Exercise 3");
        assert(routine.exercises.length === 5);
        routine.exercises.splice(2, 1);
        routine.save().then(() => {
          Routine.findOne({ _id: routine._id })
            .then(updatedRoutine => {
              assert(routine.exercises[2] === "Exercise 4");
              assert(updatedRoutine.exercises.length === 4);
              done();
            })
            .catch(err => console.log(err));
        });
      });
    });
  });

  after(done => {
    User.deleteOne({ email: routineUser.email }).then(() => {
      console.log(`${routineUser.email} deleted`);
      mongoose.connection.close(() => {
        console.log(`MongoDB disconnected`);
        done();
      });
    });
  });
});
