require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");

module.exports = (app, express) => {
  // Bodyparser middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //Mongo DB
  const db = process.env.MONGO_URI;

  //Connect to Mongo with mongoose
  mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
      console.log("MongoDB connected.");
    })
    .catch(err => {
      console.log(err);
    });

  //Serve static assets if in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
};
