const axios = require('axios').default;
const API_KEY = 'QJ3VIT49U76EATUU';
const BASE_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY"

module.exports = class StockData {
  
  getStockData(symbol) {
    return axios.get(`${BASE_URL}&symbol=${symbol}&apikey=${API_KEY}`)
  }

  dataKey() {
    return 'Time Series (Daily)';
  }

  parseStockData(list) {
    const data = list[this.dataKey()];
    const names = Object.keys(data);
    return names.map((name) => {
      return [new Date(name).getTime(), parseFloat(data[name]['1. open'])]
    })
  }
}