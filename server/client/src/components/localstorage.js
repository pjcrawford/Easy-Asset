import React, { Component } from "react";
import SimpleStorage from "react-simple-storage";

export default class ParentComponent extends Component {
  constructor(props) { 
    super(props)
    this.state = {
      text: "",
    }
  }

  render() {
    return ( 
      <div>
      
        // include the component somewhere in the parent to save the parent's state in web storage
        <SimpleStorage parent={this} />

        // the value of this input will be saved in web storage
        <input
          type="text"
          value={this.state.text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        
      </div>
    ) 
  }
}