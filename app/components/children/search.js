// Include React
import React, { Component } from "react";

// Helper for making AJAX requests to our API
import helpers from "../utils/helpers";
import Results from "./Results";

// Creating the Query component
class Search extends Component {

    // Set constructor
    constructor() {
        super()
        this.state = {
            topic: "", 
            startYear: "", 
            endYear: "", 
            searchBtn: "Seach", 
            isDisabled: "",
            results: []
        };

        //bind "this" keyword to everyfunction that might be called
        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleStartYearChange = this.handleStartYearChange.bind(this);
        this.handleEndYearChange = this.handleEndYearChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    };
    
    // This function will respond to the user input for Topic
    handleTopicChange(e) {
        this.setState({ topic: e.target.value});
        let charNum = e.target.value.length;
        if(charNum == 0){
            $("#topicText").removeClass("text-success").addClass("text-danger");
        } else if(charNum > 0){
            $("#topicText").removeClass("text-danger").addClass("text-success");
        } 
    }

    // This function will respond to the user input for StartYear
    handleStartYearChange(e) {
        this.setState({ startYear: e.target.value});
        let charNum = e.target.value.length;
        if(charNum < 4){
            $("#startYearText").removeClass("text-success").addClass("text-danger");
        } else if(charNum == 4){
            $("#startYearText").removeClass("text-danger").addClass("text-success");
        }
    }

    // This function will respond to the user input for End Year
    handleEndYearChange(e) {
        this.setState({ endYear: e.target.value});
        let charNum = e.target.value.length;
         if(charNum < 4){
            $("#endYearText").removeClass("text-success").addClass("text-danger");
        } else if(charNum == 4){
            $("#endYearText").removeClass("text-danger").addClass("text-success");
        }
    }

    // When a user submits...
    handleClick(e) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        e.preventDefault();

        //reset all "saved news" button to "save"
        $(".disabled").removeClass("disabled").text("Save");
        
        //Disable button while AJAX being called for a UX purpose
        this.setState({isDisabled: true, searchBtn: "Loading..."});
            // Run the query for the news
            helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
            .then(function(data) {
                // After get the news then set state results
                this.setState({results: data});
            }.bind(this));

        // Reset States
        this.setState({ topic: "", startYear: "", endYear: "", searchBtn: "Search", isDisabled: ""});
    }
    // Here we describe this component's render method

    render() {
        return (
            <div>
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
                    {/*Passing results state and render results component  */}
                    <Results results={this.state.results}/>         
            </div>
        );
    }
};
// export the Search component
export default Search;