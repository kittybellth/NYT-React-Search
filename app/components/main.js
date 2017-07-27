// Include React
import React from "react";
import createReactClass from 'create-react-class';

// Here we include all of the sub-components
import Search from "./children/search";


// Helper for making AJAX requests to our API
import helpers from "./utils/helpers";

// Creating the Main component
const Main = createReactClass({
    // Here we set a generic state associated with the number of clicks
    // Note how we added in this history state variable
    getInitialState: function() {
      return { searchTopic: "", searchStartYear: "", searchEndYear: "", results: [], saved: [] };
    },

    componentDidUpdate: function() {
      // Run the query for the address
      helpers.runQuery(this.state.searchTopic, this.state.searchStartYear, this.state.searchEndYear)
      .then(function(data) {
        console.log(data);
        // if (data !== this.state.results) {
        //   console.log("Address", data);
        // }
      });
    },

    // This function allows childrens to update the parent.
    setTerm: function(topic, startYear, endYear) {
      this.setState({ searchTopic: topic, searchStartYear: startYear, searchEndYear: endYear });
    },
    // Here we render the function
    render: function() {
      return (
      <div>
        <div className="jumbotron">
            <h1 className="text-center"><ins>New York Times Article Scrubber</ins></h1>
            <p className="text-center">Seach and annotate articles of interest!</p>
        </div>
        <div className="col-md-10 col-md-offset-1">
            <Search setTerm={this.setTerm}/>
        </div>
      </div>
    );
  }
});

module.exports = Main;