require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Bodyparser middleware
app.use(express.json());

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

//Use Routes
// app.use("/api/items", require("./routes/api/items"));
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/auth", require("./routes/api/auth"));

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

// ************************

// const app = require("./app");
// const https = require("https");

// // Port to environment variable or 8000
// const port = process.env.PORT || 8000;

// // Server with Express app request handler
// const server = https.createServer(app);

// // Listen on port
// server.listen(port, () => {
//   console.log(`Server listening on ${port}`);
// });
