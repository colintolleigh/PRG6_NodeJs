
const express = require("express");
const bodyParser = require("body-parser");

//Load the environment variables
require('dotenv').config()

//test
console.log(process.env.BASE_URI);

// Import the mongoose module
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/jdms";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


//Create webserver
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.json())
app.use(express.urlencoded({extended: false}));

//creates a route /

const jdmRouter = require("./routers/jdmRouter");

app.use("/jdms/", jdmRouter);


// Server is running on server 8000
app.listen(8000, () => {
    console.log("Server Running");
});