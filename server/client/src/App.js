import React, { Component } from 'react';
import axios from 'axios';
import _ from "lodash";
import AppHeader from './components/AppHeader';
import HighchartsWrapper from './components/HighchartsWrapper';
import StockListView from './components/StockListView';
import StockAddForm from './components/StockAddForm';

import './App.css';
const root_url = "localhost:5000/api"
const cors = require("cors");


class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      user: [],
      series: [],
      stocks: [],
      NewStockValue: '',
      chart: null,
      // client: uuidv4(),

    };
  //   const [value, setValue] = useStateWithLocalStorage(
  //     'myValueInLocalStorage'
  //   );
  //   const onChange = event => setValue(event.target.value);
  }
  render() {
        return (
          <div className="App">

            <AppHeader />
    
            <section className="app-main-section">
              <div className="app-left-container">
                <h1 className="app-section-title"> Portfolio Risk is Low! </h1>
                <HighchartsWrapper series={this.state.series} id="chart-container" getChart={this.getChart}/>
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
 

      // router.get('/add/:symbol', (req, res) => {
      //   const newStock = new Stocks.model({ name: req.params.symbol})
      //   newStock.save().then((saved) => {
      //     res.json(saved);
      //   })
      //   .catch((err) => {
      //     res.end();
      //   })
      // })
      
      // router.delete('/:symbol_name', (req, res) => {
      //   Stocks.model.remove({ name: req.params.symbol_name })
      //     .then((data) => {
      //       if (data) {
      //         res.end('deleted');
      //       }
      //       res.end();
      //     })
      // })
  addStock = (e) => {
    e.preventDefault();
    if (this.state.NewStockValue && !this.state.stocks.includes(this.state.NewStockValue)) {
      this.getStock(this.state.NewStockValue)
        .then((data) => {
          if (!data.err) {

          } else {
            alert('Stock not found');
          }
          this.setState({ NewStockValue: '' });
          // localStorage.setItem(STORAGE_ID, NewStockValue);
        })
        .catch((err) => {
          console.log(err);
        })
    } 
  }

  deleteStock = (e) => {
    const stockName = e.target.name;
    axios.delete(`/stocks/${stockName}`)
      .then((res) => {
        if (res.data) {
          this.removeSerie(stockName);
        }
      })
  }
  getStock = async (name) => {
    const res = await axios.get(`${root_url}/stocks/${name}`);
    if (!res.data.err) {
      this.addSerie(res.data);
    }
    return res.data;
  }

  getStocks = () => {
    axios.get('/stocks')
      .then((res) => {const stocks  = res.data || [];
        
        const timer = setInterval(() => {
          const seriesCount = this.state.series.length
          if (seriesCount === stocks.length) {
            clearInterval(timer)
          }
        }, 2000);

        stocks.sort().forEach((stock) => {
          this.getStock(stock)
        })
      })
  }
    

  stockChangeServer = (method, serie) => {
    return (method === 'delete') ? this.removeSerie(serie) : this.addSerie(serie);
  } 
  
  handleInputChange = (e) => {
    this.setState({ NewStockValue: e.target.value });
  }

  getChart = (chart) => {
    this.setState({ chart: chart });
  }

  addSerie = (serie) => {
    const series = this.state.series.slice();
    const stocks = this.state.stocks.slice()
    if (!stocks.includes(serie.name)) {
      stocks.push(serie.name);
      series.push(serie)
      this.setState({ series: series });
      this.setState({ stocks: stocks });
      this.state.chart.add(serie); 
    }
  }
  removeSerie = (serieName) => {
    const series = this.state.series.slice();
    const stocks = this.state.stocks.slice();
    const stockIndex = stocks.findIndex((name) => (name === serieName));
    const serieIndex = stocks.findIndex((serie) => (serie.name === serieName));

    stocks.splice(stockIndex, 1);
    series.splice(serieIndex, 1)

    this.setState({ series: series });
    this.setState({ stocks: stocks });

    this.state.chart.update(this.state.series); 
  }
  socketDataR = (data) => {
    console.log(data);
    
  }
  // searchBar = async (name) => {
  //   const res = await axios.get(`${root_url}/stocks/${name}`);
  //   if (!res.data.err) {
  //     this.addSerie(res.data);
  //   }
  //   return res.data;
  // }
  componentDidMount() {

    this.getStocks();
    
  }
}

export default App;

