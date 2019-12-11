

import React, { Component } from 'react';
import StockChart from './StockChart';
import './../App.css';
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
    const chart = new StockChart(this.props.id, this.props.series, {});
    this.props.getChart(chart)
  }
}