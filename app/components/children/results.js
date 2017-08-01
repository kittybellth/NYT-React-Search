// Include React
// import React from "react";
import React, { Component } from 'react';
import createReactClass from 'create-react-class';

// Helper for making AJAX requests to our API
import helpers from "../utils/helpers";


const Results = createReactClass({

    getInitialState: function() {
    return {saved: []};
    },

     componentDidUpdate: function(prevProps, prevState) {
        
    },

    //Whenever users click save
    handleClick: function(e){
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        e.preventDefault();

        //grab number to get news from props then post to the server
        const newsNum = e.target.id;
        
        // for UX purpose disable button after clicked.
        $("#"+newsNum).text("Saved!").addClass("disabled");

            // Run the query for the "POST" to the server
            helpers.postNews(this.props.results[newsNum])
            .then(function(data) {
                //set saved state with mongo _id
                let newSavedArr = this.props.saved.concat(data);
                console.log(newSavedArr)
                this.props.setSaved(newSavedArr);
            }.bind(this));
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
                                <button className="btn btn-primary" onClick={this.handleClick} id={i}>Save</button>
                                </blockquote>
                        )} else{
                            return (
                                <blockquote className="blockquote-reverse" key={i}>
                                <h5>{search.headline}</h5>
                                <p>{search.snippet}</p>
                                <small><a href={search.url}>Link </a><cite title="Source Title">{search.date}</cite></small>
                                <button className="btn btn-primary" onClick={this.handleClick} id={i}>Save</button>
                                </blockquote>
                        )}
                    },this)}
                </div>
            </div>
        )
    }
});


module.exports = Results;