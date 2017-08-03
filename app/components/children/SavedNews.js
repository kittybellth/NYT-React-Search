// import React from "react";
import React, { Component } from 'react';

// Helper for making AJAX requests to our API
import helpers from "../utils/helpers";

class SavedNews extends Component {
    constructor(){
        super();
        this.state = {
            savedNews:[]
        }
        this.getSavedNews = this.getSavedNews.bind(this);
        this.renderSavedNews = this.renderSavedNews.bind(this);

    }
    //After this component is loaded then call getSavedNews function
    componentDidMount() {
        this.getSavedNews();
    }

    // to be able to access tootip with bootstrap place tooltip inside  DidUpdate
    componentDidUpdate(){
        $('[data-toggle="tooltip"]').tooltip()
    }
    getSavedNews() {
        // get saved news from server with helpers
        helpers.getSavedNews().then(savedNews=>{
            console.log(savedNews.data);
            //after data come back then set state
            this.setState({savedNews: savedNews.data})
        });
    }

    renderSavedNews() {
        // iterate through the state
        return this.state.savedNews.map((news, i)=>{
                return (
                <div className="well" key={news._id}>
                    <button  type="button" className="close" data-id={news._id} data-toggle="tooltip" data-placement="top" title="Remove from save">
                        <span>&times;</span>
                    </button>
                    <h5>
                        <span className="label label-default">{i+1}</span>
                        {news.headline}
                    </h5>
                    <p>{news.snippet}</p>
                    <small>
                        <a href={news.url}>Link </a><cite title="Source Title">{news.date}</cite>
                    </small>
                    <p>
                        <a href="#" data-id={news._id} className="btn btn-info btn-sm">Add Notes</a>
                    </p>
                </div>
                )
            })
            
    }
    render() {
        return(
                <div className="panel panel-default">
                        <div className="panel-heading text-center"><h5>Saved News</h5></div>
                        <div className="panel-body">
                            {/*We'll call render function here  */}
                            {this.renderSavedNews()}
                        </div>
                </div>
        )
    }
}

//export class 
export default SavedNews;