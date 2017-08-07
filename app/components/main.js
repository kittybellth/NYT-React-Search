// Include React
import React, { Component }from "react";
import Jumbotron from "./children/Jumbotron";

class Main extends Component {
    constructor(props){
        super(props)
    } 
    render(){
        return(
          <div>
            {/*passing pathname to Jumbotron component  */}
            <Jumbotron location={this.props.location.pathname}/>
            {this.props.children}

            {/*Forkit  */}
            <div className="forkit-curtain">
                <h2>Welcome to my Github !</h2>
            </div>
            <a className="forkit" data-text="Pull me.." data-text-detached="Drag down >" href="https://github.com/kotchaparn-w/NYT-React-Search">
                <img style={style} src="https://github-camo.global.ssl.fastly.net/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub"/>
            </a>
          </div>
        )
    }

};

const style = {
position: "absolute",
top: 0,
right: 0,
border: 0
}
export default Main;