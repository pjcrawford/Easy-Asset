import React, { Component } from 'react';
import './../App.css';

// import newdata from './stock_data.json';
// var jsonString = JSON.stringify(newdata);


export default class StockListView extends Component {
  // constructor ()
  // {
  //   super();
  //   this.state={
  //     // ticker: this.props.stocks.map(item),
  //     EPS: '',
  //     EBITDA: '',
  //     PE: '',
  //     ROA: '',
  //     ROE: '',
  //     OverallRisk:''

  //   }

// }

  render() {
    return(
      
      <div className="stock-list-view">
        {this.ListItems()}
      </div>
    )
  }

  ListItems() {
    const newData = this.state={
      ticker: this.props.stocks.item,
      EPS: '6',
      EBITDA: '4',
      PE: '',
      ROA: '',
      ROE: '',
      OverallRisk:''

    }
  {
    return this.props.stocks.map((item, index) => {
      return(
        
        <div className="stock-item" key={item}>
          <h1 className="stock-title"> {item} </h1>
          <p className="stock-description"> Overall Risk : <b>Low </b> </p> Beta: {item}, PEG: {newData.EPS}, P/S: .67 
          <p className="stock-description"> </p> PE Ratio: 1.2, SD: 0.24, WACC: .52 
          {/* <button id={index} name={item} className="stock-btn-info" onClick={this.props.ModalExample}> Risk info </button> */}
          <button id={index} name={item} className="stock-btn-delete" onClick={this.props.onDelete}> x </button>
        </div>
      )
    })
  }
}
}

