// Include React
import React from "react";
import createReactClass from 'create-react-class';

// Here we include all of the sub-components
import Search from "./children/search";
import Results from "./children/Results";


// Helper for making AJAX requests to our API
import helpers from "./utils/helpers";


// Creating the Main component
const Main = createReactClass({
    // Here we set a generic state associated with the number of clicks
    // Note how we added in this history state variable
    getInitialState: function() {
      return { searchTopic: "", searchStartYear: "", searchEndYear: "", results: [], saved: [] };
    },

    // If the component changes (i.e. if a search is entered)...
    componentDidUpdate: function() {
    
    },

    // This function allows childrens to update the parent.
    setResults: function(results) {
      this.setState({ results: results });
    },

    setSaved: function(savedNews) {
      this.setState({ saved: savedNews });
    },

    // Here we render the function
    render: function() {
      return (
      <div>
        <div className="jumbotron">
            <h1 className="text-center"><ins>New York Times Article Scrubber</ins></h1>
            <p className="text-center">Seach and annotate articles of interest!</p>
            <p></p>
        </div>
        <div className="col-md-10 col-md-offset-1">
            <Search setResults={this.setResults}/>
        </div>
        <div className="col-md-10 col-md-offset-1">
            <Results results={this.state.results}
              saved={this.state.saved}
              setSaved={this.setSaved}  
            />
        </div>
      </div>
    );
  }
});

module.exports = Main;