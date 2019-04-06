require("dotenv").config();
const assert = require("assert").strict;
const User = require("../models/User");
const mongoose = require("mongoose");

describe("User model", () => {
  // newUser model baseline object
  let newUser = {
    username: "JohnDoe",
    email: "test@test.com",
    password: "password"
  };

  let { collectionName } = User.collection;

  before(done => {
    mongoose
      .connect(process.env.MONGO_TEST_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("MongoDB connected");
        done();
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

  it("should create and save new user document to database", done => {
    User.create(newUser)
      .then(user => {
        // isNew property will be false after user is saved to DB
        assert(!user.isNew);
        done();
      })
      .catch(err => console.log(err));
  });

  it("should return and read saved user details", done => {
    User.create(newUser)
      .then(saved => {
        User.findById(saved._id).then(user => {
          assert(user.username === newUser.username);
          assert(user.email === newUser.email);
          assert(user.password === newUser.password);
          done();
        });
      })
      .catch(err => console.log(err));
  });

  describe("Required fields", () => {
    it("should not create a user without a username", done => {
      User.create({ email: newUser.email, password: newUser.password })
        .then(res => console.log(res))
        .catch(err =>
          assert(err.errors.username.message === "Username required.")
        );
      done();
    });

    it("should not create a user without an email", done => {
      User.create({ username: newUser.username, password: newUser.password })
        .then(res => console.log(res))
        .catch(err =>
          assert(err.errors.email.message === "Email address required.")
        );
      done();
    });

    it("should not create a user without a password", done => {
      User.create({ email: newUser.email, username: newUser.username })
        .then(res => console.log(res))
        .catch(err =>
          assert(err.errors.password.message === "Password required.")
        );
      done();
    });
  });

  describe("Validations", () => {
    it("Username should be at least six characters long", done => {
      let tooShort = { ...newUser, username: "short" };
      User.create(tooShort, err =>
        assert(err.message.indexOf("6 characters") !== -1)
      );
      done();
    });

    it("Username should be no more than 25 characters long", done => {
      let tooLong = {
        ...newUser,
        username: "Definitely too long of a username"
      };
      User.create(tooLong, err =>
        assert(err.message.indexOf("25 characters") !== -1)
      );
      done();
    });

    it("Password should be at least six characters long", done => {
      let tooShort = { ...newUser, password: "short" };
      User.create(tooShort, err =>
        assert(err.message.indexOf("6 characters") !== -1)
      );
      done();
    });
  });

  describe("Updating and deleting a user", () => {
    beforeEach(done => {
      User.create(newUser, err => {
        if (err) throw err;
        console.log("Creating test user");
        done();
      });
    });

    it("should find and update username", done => {
      User.findOneAndUpdate(
        { username: newUser.username },
        { username: "JaneDoe" }
      ).then(user => {
        User.findById(user._id)
          .then(updatedUser => {
            assert(user.username !== updatedUser.username);
            done();
          })
          .catch(err => done(err));
      });
    });

    it("should find and delete the document", done => {
      User.deleteOne({ email: newUser.email })
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
