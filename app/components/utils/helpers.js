// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// NYT API Key
const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

const queryURLbase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

// Helper functions for making API Calls
const helper = {

  // This function serves our purpose of running the query to NYT.
  runQuery: function(searchTopic, searchStartYear, searchEndYear) {

    // Figure out the geolocation
    var queryURL = queryURLbase + searchTopic + "&begin_date=" + searchStartYear + "0101"
                    + "&end_date=" + searchEndYear + "0101";

     console.log(queryURL);

    return axios.get(queryURL).then(function(res) {
      // If get a result, return that result's formatted address property
      if (res.data.response.docs[0]) {
        
        return res.data.response.docs;
      }
      // If we don't get any results, return an empty string
      return "";
    });
//   },

  // This function hits our own server to retrieve the record of query results
//   getHistory: function() {
//     return axios.get("/api");
//   },

  // This function posts new searches to our database.
//   postHistory: function(location) {
//     return axios.post("/api", { location: location });
  }
};

// We export the API helper
module.exports = helper;