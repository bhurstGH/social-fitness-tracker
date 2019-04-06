require("dotenv").config();
const assert = require("assert").strict;
const Routine = require("../models/Routine");
const User = require("../models/User");
const mongoose = require("mongoose");

describe.only("Routine model", () => {
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
        User.create(routineUser).then(() => {
          console.log("MongoDB connected");
        });
      })
      .catch(err => {
        console.log(err);
      });
    done();
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

  //   it("should return and read saved exercise details", done => {
  //     Routine.create(newExercise)
  //       .then(saved => {
  //         Routine.findById(saved._id).then(exercise => {
  //           assert(exercise.name === newExercise.name);
  //           done();
  //         });
  //       })
  //       .catch(err => console.log(err));
  //   });

  //   describe("Required fields", () => {
  //     it("should not create an exercise without a name", done => {
  //       Routine.create({})
  //         .then(res => console.log(res))
  //         .catch(err =>
  //           assert(err.errors.name.message === "Name of exercise required.")
  //         );
  //       done();
  //     });
  //   });

  //   describe("Updating and deleting an exercise", () => {
  //     beforeEach(done => {
  //       Routine.create(newExercise, err => {
  //         if (err) throw err;
  //         console.log("Creating test exercise");
  //         done();
  //       });
  //     });

  //     it("should find and update exercise", done => {
  //       Routine.findOneAndUpdate(
  //         { name: newExercise.name },
  //         { name: "Super Dummy Routine" }
  //       ).then(exercise => {
  //         Routine.findById(exercise._id)
  //           .then(updatedExercise => {
  //             assert(exercise.name !== updatedExercise.name);
  //             done();
  //           })
  //           .catch(err => done(err));
  //       });
  //     });

  //     it("should find and delete the document", done => {
  //       Routine.deleteOne({ name: newExercise.name })
  //         .then(res => {
  //           assert(res.deletedCount === 1);
  //           done();
  //         })
  //         .catch(err => done(err));
  //     });
  //   });

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
