// Include React
import React from "react";
import createReactClass from 'create-react-class';

// Helper for making AJAX requests to our API
import helpers from "../utils/helpers";

// Creating the Form component
const Search = createReactClass({

    // Here we set a generic state associated with the text being searched for
    getInitialState: function() {
    return { topic: "", startYear: "", endYear: "", searchBtn: "Seach", isDisabled: "" };
    },
    
    // This function will respond to the user input
    handleTopicChange: function(e){
        this.setState({ topic: e.target.value});
        var charNum = e.target.value.length;
        if(charNum == 0){
            $("#topicText").removeClass("text-success").addClass("text-danger");
        } else if(charNum > 0){
            $("#topicText").removeClass("text-danger").addClass("text-success");
        } 
    },
     handleStartYearChange: function(e){
        this.setState({ startYear: e.target.value});
        var charNum = e.target.value.length;
        if(charNum < 4){
            $("#startYearText").removeClass("text-success").addClass("text-danger");
        } else if(charNum == 4){
            $("#startYearText").removeClass("text-danger").addClass("text-success");
        }
    },
     handleEndYearChange: function(e){
        this.setState({ endYear: e.target.value});
        var charNum = e.target.value.length;
         if(charNum < 4){
            $("#endYearText").removeClass("text-success").addClass("text-danger");
        } else if(charNum == 4){
            $("#endYearText").removeClass("text-danger").addClass("text-success");
        }
    },

    // When a user submits...
    handleClick: function(e) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button

        //reset all saved news
        $(".disabled").removeClass("disabled").text("Save");
        e.preventDefault();
        
        this.setState({isDisabled: true, searchBtn: "Loading..."});
        // Run the query for the news
        helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
        .then(function(data) {
            this.props.setResults(data);
        }.bind(this));
        // Set the parent to have the search term
        this.setState({ topic: "", startYear: "", endYear: "", searchBtn: "Search", isDisabled: ""});
    },
    // Here we describe this component's render method

    render: function() {
        return (
                <div className="panel panel-default">
                    <div className="panel-heading text-center"><h5>Search</h5></div>
                    <div className="panel-body">
                        <form className="form-horizontal">
                            <fieldset>
                                <div className="form-group">
                                    <label className="col-md-2 col-md-offset-1 control-label text-danger" id="topicText">Topic</label>
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
                                    <label className="col-md-2 col-md-offset-1 control-label text-danger" id="startYearText">Start Year</label>
                                    <div className="col-md-2">
                                        <input type="text"
                                        value={this.state.startYear} 
                                        className="form-control" 
                                        id="startYear"
                                        placeholder="YYYY"
                                        onChange={this.handleStartYearChange}
                                        />
                                    </div>
                                    <label className="col-md-2 control-label text-danger" id="endYearText">End Year</label>
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
                                type="submit"
                                id="submit"
                                onClick={this.handleClick}
                                disabled={this.state.isDisabled}
                                >
                                {this.state.searchBtn}
                                </button>
                            </div>
                        </div>
                        </form>     
                    </div>
                </div>
            );
    }
});

module.exports = Search;