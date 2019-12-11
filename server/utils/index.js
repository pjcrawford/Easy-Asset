const axios = require('axios').default;

module.exports = class StockData {
  
  constructor() {
    this.url = "https://www.alphavantage.co/query?function=TIME_groupS_DAILY";
  
  }

  getStockData(symbol) {
    return axios.get(`${this.url}&symbol=${symbol}&interval=1min&apikey=${ process.env.ALPHA_API_KEY}`)
  }

  dataKey() {
    return 'Time groups (Daily)';
  }

  parseStockData(group) {
    const data = group[this.dataKey()];
    const names = Object.keys(data);
    return names.map((name) => {
      return [new Date(name).getTime(), parseFloat(data[name]['1. open'])]
    })
  }
  // getKeyInfo(symbol) {
  //   return axios.get(`${this.url}&symbol=${symbol}&interval=1min&apikey=${ process.env.ALPHA_API_KEY}`)
  // }
}