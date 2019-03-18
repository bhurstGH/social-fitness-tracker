require("dotenv").config();
const path = require("path");
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

  // Check for production environment and direct to React
  if (process.env.NODE_ENV === "production") {
    // Serve static files from React build
    app.use(express.static(path.join(__dirname, "../../client/build")));

    // Serve unhandled paths to React index.html
    app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../client/build/index.html"));
    });
  }
};
