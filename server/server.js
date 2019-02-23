const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

//Connect to MongoDB Atlas
const db = require('../config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})