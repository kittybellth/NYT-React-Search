

// Require News Schema
const News = require ("../models/News");

module.exports = {

    // Here we'll save the news based on the JSON input.
    save: function (req, res){
      const entry = new News(req.body.data);
        // Now, save that entry to the db
        entry.save(function(err, doc) {
          // Log any errors
          if (err) {
          console.log(err);
          }
          // Or log the doc
          else { 
          res.json(doc._id);      
          };
        });
    }
};