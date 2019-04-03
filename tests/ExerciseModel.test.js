require("dotenv").config();
const assert = require("assert").strict;
const Exercise = require("../models/Exercise");
const mongoose = require("mongoose");

describe("Exercise model", () => {
  // newUser model baseline object
  let newExercise = {
    name: "Dummy Exercise"
  };

  let { collectionName } = Exercise.collection;

  before(done => {
    mongoose
      .connect(process.env.MONGO_TEST_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("MongoDB connected");
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

  it("should create and save new exercise document to database", done => {
    Exercise.create(newExercise)
      .then(exercise => {
        // isNew property will be false after user is saved to DB
        assert(!exercise.isNew);
        done();
      })
      .catch(err => console.log(err));
  });

  it("should return and read saved exercise details", done => {
    Exercise.create(newExercise)
      .then(saved => {
        Exercise.findById(saved._id).then(exercise => {
          assert(exercise.name === newExercise.name);
          done();
        });
      })
      .catch(err => console.log(err));
  });

  describe("Required fields", () => {
    it("should not create an exercise without a name", done => {
      Exercise.create({})
        .then(res => console.log(res))
        .catch(err =>
          assert(err.errors.name.message === "Name of exercise required.")
        );
      done();
    });
  });

  describe("Updating and deleting an exercise", () => {
    beforeEach(done => {
      Exercise.create(newExercise, err => {
        if (err) throw err;
        console.log("Creating test exercise");
        done();
      });
    });

    it("should find and update exercise", done => {
      Exercise.findOneAndUpdate(
        { name: newExercise.name },
        { name: "Super Dummy Exercise" }
      ).then(exercise => {
        Exercise.findById(exercise._id)
          .then(updatedExercise => {
            assert(exercise.name !== updatedExercise.name);
            done();
          })
          .catch(err => done(err));
      });
    });

    it("should find and delete the document", done => {
      Exercise.deleteOne({ name: newExercise.name })
        .then(res => {
          assert(res.deletedCount === 1);
          done();
        })
        .catch(err => done(err));
    });
  });

  after(done => {
    mongoose.connection.close(() => {
      console.log(`MongoDB disconnected`);
      done();
    });
  });
});
