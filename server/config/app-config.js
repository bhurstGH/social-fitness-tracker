require("dotenv").config();
const mongoose = require("mongoose");

// Export function to initiate app and middleware
module.exports = (app, express) => {
  // Body Parser, JSON and URL encoded forms
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //Connect to MongoDB Atlas
  const db = process.env.MONGO_URI;
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(err => {
      console.log(err);
    });
};
