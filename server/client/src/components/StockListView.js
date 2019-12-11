import React, { Component } from 'react';
import './../App.css';

export default class StockListView extends Component {
  render() {
    return(
      <div className="stock-list-view">
        {this.ListItems()}
      </div>
    )
  }

  ListItems() {
    return this.props.stocks.map((item, index) => {
      return(
        <div className="stock-item" key={item}>
          <h1 className="stock-title"> {item} </h1>
          <p className="stock-description"> Overall Risk : <b>Low </b> </p> Beta: 1.2, PEG: 0.8, P/S: .67 
          <p className="stock-description"> </p> PE Ratio: 1.2, SD: 0.24, WACC: .52 
          {/* <button id={index} name={item} className="stock-btn-info" onClick={this.props.ModalExample}> Risk info </button> */}
          <button id={index} name={item} className="stock-btn-delete" onClick={this.props.onDelete}> x </button>
        </div>
      )
    })
  }
}