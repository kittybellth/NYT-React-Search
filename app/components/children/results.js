// Include React
import React from "react";
import createReactClass from 'create-react-class';


const Results = createReactClass({
    render: ()=> {
        return(
            <div className="panel panel-default">
                <div className="panel-heading text-center">Results</div>
                <div className="panel-body">
                </div>
            </div>
        )
    }
});


module.exports = Results;