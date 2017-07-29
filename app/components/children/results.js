// Include React
import React from "react";
import createReactClass from 'create-react-class';

// Helper for making AJAX requests to our API
import helpers from "../utils/helpers";


const Results = createReactClass({

    getInitialState: function() {
    return {saved: []};
    },

     componentDidUpdate: function() {
        
    },

    //Whenever users click save
    handleClick: function(e){
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        e.preventDefault();
        //grab number to get news from props then post to the server
        let newsNum = e.target.value;

            // Run the query for the "POST" to the server
            helpers.postNews(this.props.results[newsNum])
            // .then(function(data) {

            // }.bind(this));
    },

    render: function() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading text-center"><h5>Results</h5></div>
                <div className="panel-body">
                    {/*use a map function to loop through an array in JSX  */}
                    {this.props.results.map(function(search, i) {
                        if (i % 2 == 0){
                            return (
                                <blockquote key={i}>
                                <h5>{search.headline}</h5>
                                <p>{search.snippet}</p>
                                <small><a href={search.url}>Link </a><cite title="Source Title"> {search.date}</cite></small>
                                <button className="btn btn-primary" onClick={this.handleClick} value={i}>Save</button>
                                </blockquote>
                        )} else{
                            return (
                                <blockquote className="blockquote-reverse" key={i}>
                                <h5>{search.headline}</h5>
                                <p>{search.snippet}</p>
                                <small><a href={search.url}>Link </a><cite title="Source Title">{search.date}</cite></small>
                                <button className="btn btn-primary" onClick={this.handleClick} value={i}>Save</button>
                                </blockquote>
                        )}
                    },this)}
                </div>
            </div>
        )
    }
});


module.exports = Results;