const express = require("express");
const mongoose = require("mongoose");

const app = express();

// dotenv config to access variables in .env
require("dotenv").config();

// Body Parser, JSON and URL encoded forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to MongoDB Atlas
const db = require("../server/config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log(err);
  });

module.export = app;
