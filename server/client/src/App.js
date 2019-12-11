import React, { Component } from 'react';
import axios from 'axios';
import _ from "lodash";
import AppHeader from './components/AppHeader';
import HighchartsWrapper from './components/HighchartsWrapper';
import StockListView from './components/StockListView';
import StockAddForm from './components/StockAddForm';
import Socket from './components/Socket';
import './App.css';
const root_url = "http://localhost:5000"
const cors = require("cors");

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      groups: [],
      stocks: [],
      NewStockValue: '',
      chart: null,
     
    };
  }
  render() {
        return (
          <div className="App">
            <AppHeader />
    
            <section className="app-main-section">
              <div className="app-left-container">
                <h1 className="app-section-title"> Portfolio Risk is Low! </h1>
                <HighchartsWrapper groups={this.state.groups} id="chart-container" getChart={this.getChart}/>
              </div>
              <div className="app-right-container">
                <h1 className="app-section-title"> Add Stock to Portfolio </h1>
                <StockAddForm onClick={this.addStock} onChange={this.handleInputChange} value={this.state.NewStockValue}/>
                <StockListView stocks={this.state.stocks} onDelete={this.deleteStock}/>
              </div>
            </section>
          </div>
        );
      }
 
//to be moved to reducers
  addStock = (e) => {
    e.preventDefault();
    if (this.state.NewStockValue && !this.state.stocks.includes(this.state.NewStockValue)) {
      this.getStock(this.state.NewStockValue)
        .then((data) => {
          if (!data.err) {
            this.socket.stockChange('add', data);
          } else {
            alert('Stock not found');
          }
          this.setState({ NewStockValue: '' });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  getStock = async (name) => {
    const res = await axios.get(`${root_url}/stocks/${name}`);
    if (!res.data.err) {
      this.addgroup(res.data);
    }
    return res.data;
  }

  getStocks = () => {
    axios.get(`${root_url}/stocks`)
      .then((res) => {
        const stocks  = res.data || [];

        stocks.sort().forEach((stock) => {
          this.getStock(stock)
        })
      })
  }
    
 
  deleteStock = (e) => {
    const stockName = e.target.name;
    axios.delete(`/stocks/${stockName}`)
      .then((res) => {
        if (res.data) {
          this.removegroup(stockName);
          this.socket.stockChange('delete', stockName);
        }
      })
    }
  

  stockChangeServer = (method, group) => {
    return (method === 'delete') ? this.removegroup(group) : this.addgroup(group);
  } 
  
  handleInputChange = (e) => {
    this.setState({ NewStockValue: e.target.value });
  }

  getChart = (chart) => {
    this.setState({ chart: chart });
  }

  addGroup = (group) => {
    const groups = this.state.groups.slice();
    const stocks = this.state.stocks.slice()
    if (!stocks.includes(group.name)) {
      stocks.push(group.name);
      groups.push(group)
      this.setState({ groups: groups });
      this.setState({ stocks: stocks });
      this.state.chart.add(group); 
    }
  }

  
  componentDidMount() {
    this.socket = new Socket();
    this.socket.onStockChange(this.stockChangeServer);
    this.getStocks();
  }
}

export default App;

