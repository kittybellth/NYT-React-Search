// Include React
import React from "react";
import createReactClass from 'create-react-class';

// Here we include all of the sub-components
import Results from "./Results";

// Creating the Form component
const Search = createReactClass({

    // Here we set a generic state associated with the text being searched for
    getInitialState: function() {
    return { topic: "", startYear: "", endYear: "" };
    },
    
    // This function will respond to the user input
    handleTopicChange: function(e){
        this.setState({ topic: e.target.value});
    },
     handleStartYearChange: function(e){
        this.setState({ startYear: e.target.value});
    },
     handleEndYearChange: function(e){
        this.setState({ endYear: e.target.value});
       
    },

    // When a user submits...
    handleSubmit: function(e) {

        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        e.preventDefault();

        // Set the parent to have the search term
        this.props.setTerm(this.state.topic, this.state.startYear, this.state.endYear);
        this.setState({ topic: "", startYear: "", endYear: "" });
    },
    // Here we describe this component's render method

    render: function() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading text-center">Search</div>
                    <div className="panel-body">
                        <form className="form-horizontal"
                        onSubmit={this.handleSubmit}>
                            <fieldset>
                                <div className="form-group">
                                    <label className="col-md-2 col-md-offset-1 control-label">Topic</label>
                                    <div className="col-md-6">
                                        <input type="text"
                                        value={this.state.topic} 
                                        className="form-control" 
                                        id="topic"
                                        onChange={this.handleTopicChange}
                                        />
                                    </div>                                             
                                </div>
                                <div className="form-group">
                                    <label className="col-md-2 col-md-offset-1 control-label">Start Year</label>
                                    <div className="col-md-2">
                                        <input type="text"
                                        value={this.state.startYear} 
                                        className="form-control" 
                                        id="startYear"
                                        placeholder="YYYY"
                                        onChange={this.handleStartYearChange}
                                        />
                                    </div>
                                    <label className="col-md-2 control-label">End Year</label>
                                    <div className="col-md-2">
                                        <input type="text" 
                                        value={this.state.endYear} 
                                        className="form-control" 
                                        id="endYear"
                                        placeholder="YYYY"
                                        onChange={this.handleEndYearChange}
                                        />  
                                    </div>
                                </div>
                            </fieldset>
                            <div className="row">
                            <div className="col-md-2 col-md-offset-5 text-center">
                                <button 
                                className="btn btn-default btn-lg" 
                                type="submit">
                                Search
                                </button>
                            </div>
                        </div>
                        </form>
                        
                    </div>
                </div>
                <Results />
            </div>
    );
  }
});

module.exports = Search;