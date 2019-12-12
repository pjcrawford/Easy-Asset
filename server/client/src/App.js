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

// const useStateWithLocalStorage = localStorageKey => {
//   const [value, setValue] = React.useState(
//     localStorage.getItem(localStorageKey) || ''
//   );

//   React.useEffect(() => {
//     localStorage.setItem(localStorageKey, value);
//   }, [value]);

//   return [value, setValue];
// };


class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
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
            <Socket dataChanged={this.socketDataR} />
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
 
    //  search = async (term) => {
    //   const res = await axios.get(
    //       `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=${this.apikey}`); {
    //         if (!res.data.err) {
    //         console.log('search not');
    //       }
    //       return res.data;
    //       }
       
    //   }
    
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
          this.socket.stockChange('delete', stockName);
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
    this.socket = new Socket();
    this.socket.onStockChange(this.stockChangeServer);

    this.getStocks();
    
  }
}

export default App;

