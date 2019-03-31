require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const session = require("express-session");

module.exports = (app, express) => {
  require("./passport-config")(passport);

  // Bodyparser middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //Mongo DB
  const db = process.env.MONGO_URI;

  //Connect to Mongo with mongoose
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log("MongoDB connected.");
    })
    .catch(err => {
      console.log(err);
    });

  app.use(
    session({
      secret: "sftsecret",
      resave: false,
      saveUninitialized: true
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
