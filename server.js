//require all credentials info
require('dotenv').config()

// Include Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require ("mongoose");
const bluebird = require("bluebird");

// Require controller
const dbController = require ("./controller/dbController");

// Create Instance of Express
const app = express();
// Sets an initial port. We'll use this later in our listener
const PORT = process.env.PORT || 8080;

//replaced mongoose promises with bluebird library
mongoose.Promise = bluebird;
// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB Configuration configuration
const promise = mongoose.connect(process.env.MONGODB_URI || process.env.DB_LOCAL, 
  {useMongoClient: true});

const db = mongoose.connection;

  db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
  });

  db.once("open", function() {
    console.log("Mongoose connection successful.");
  });
// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", (req, res)=> {
  res.sendFile(__dirname + "/public/index.html");
});


//This is the route that will send back all saved news to browsers
app.get("/api/saved/news", dbController.getSavedNews);

// This is the route we will send POST requests to save each news.
app.post("/news/save", dbController.save);

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
