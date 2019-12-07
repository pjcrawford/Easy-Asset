import React, { Component } from 'react';
import Chart from './Chart';
import './../assets/css/App.css';

export default class HighchartsWrapper extends Component {
  componentDidMount(){
    this.chart();
  }

  render() {
    return(
      <div id={this.props.id} className="chart-container">
      </div>
    )
  }

  chart() {
    const chart = new Chart(this.props.id, this.props.series, {});
    this.props.getChart(chart)
  }
}