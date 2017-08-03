// Include the React library
import React from "react";

// Include links
import { Link } from "react-router-dom";

//Create function 
const Jumbotron = () => (
    <div className="jumbotron">
        <h1 className="text-center"><ins>New York Times Article Scrubber</ins></h1>
        <p className="text-center">Seach and annotate articles of interest!</p>
        <p className="text-center">
            <Link to="/"><button className="btn btn-default btn-lg">Search</button></Link>
            <Link to="savednews"><button className="btn btn-danger btn-lg">Saved News</button></Link>
        </p>
    </div>
)


//Export Jumbotron
export default Jumbotron;