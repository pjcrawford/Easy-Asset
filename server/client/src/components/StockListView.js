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
// "ticker": "PIH",
//     "company_name": "1347 Property Insurance Holding",
//     "market_cap": 29497118.000000004,
//     "52_week_delta": -0.0020661354,
//     "dividend_payout_ratio": 0,
//     "forward_eps": 1.15,
//     "g_revenue": 0.749,
//     "gross_margin_pct": 0.27115,
//     "ebitda_margin_pct": 0.0054400004,
//     "price_to_forward_earnings": 4.261,
//     "price_to_book": 0.77250516,
//     "debt_to_equity": 0,
//     "return_on_assets": 0.00078,
//     "return_on_equity": 0.025150001,
//     "largest_institutional_owner": "CWA Asset Management Group, LLC",
//     "recommendation": "none"

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

