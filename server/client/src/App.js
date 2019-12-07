import React, { Component } from 'react';
import axios from 'axios';
import Chart from './components/Chart';
import HighchartsWrapper from './components/HighchartsWrapper';
import './App.css';


class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="app-title"> Welcome to Easy Asset!
          </h1>
        </header>
        <div className="App-main-body">
        <Chart/>
        </div>
      </div>
    );
  }


}
export default App;
