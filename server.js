// Include Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require ("mongoose");

// Require News Schema
const News = require ("./models/News");

// Create Instance of Express
const app = express();
// Sets an initial port. We'll use this later in our listener
const PORT = process.env.PORT || 8080;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB Configuration configuration
mongoose.connect(process.env.DB_LOCAL);
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


// This is the route we will send POST requests to save each news.
app.post("/news/save", (req, res)=> {
  console.log(req.body.data);

  // Here we'll save the news based on the JSON input.

  var entry = new News(req.body.data);
    // Now, save that entry to the db
    entry.save(function(err, doc) {
      // Log any errors
      if (err) {
      console.log(err);
      }
      // Or log the doc
      else { 
      res.json(doc._id);      
      }
    });
});


// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
