// Include React
import React from "react";
import Jumbotron from "./children/Jumbotron";

 const Main = props => (
  <div>
    <Jumbotron />
    <div className="col-md-10 col-md-offset-1">
      {props.children}
    </div>
  </div>
 );

export default Main;