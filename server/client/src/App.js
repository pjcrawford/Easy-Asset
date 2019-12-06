import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="app-title"> Welcome to Easy Asset!
          </h1>
        </header>
        <div className="App-main-body">
        </div>
      </div>
    );
  }
}
export default App;
