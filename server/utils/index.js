const axios = require('axios').default;

module.exports = class StockData {
  
  constructor() {
    this.url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
    this.searchurl= "https://www.alphavantage.co/query?function=SYMBOL_SEARCH"
  }


  getStockData(symbol) {
    return axios.get(`${this.url}&symbol=${symbol}&interval=1min&apikey=${ process.env.ALPHA_API_KEY}`)
  }

  dataKey() {
    return 'Time Series (Daily)';
  }

  parseStockData(serie) {
    const data = serie[this.dataKey()];
    const names = Object.keys(data);
    return names.map((name) => {
      return [new Date(name).getTime(), parseFloat(data[name]['1. open'])]
    })
  }
  
  // async search(term) {
  //   return await fetch(
  //     `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=${
  //       process.env.ALPHA_API_KEY
  //     }`
  //   ).then(response => {
  //     try {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error(response.status);
  //       }
  //     } catch (e) {
  //       console.log(`Caught error: ${e}`);
  //     }
  //   });
  // }


}
  // getKeyInfo(symbol) {
  //   return axios.get(`${this.url}&symbol=${symbol}&interval=1min&apikey=${ process.env.ALPHA_API_KEY}`)
  // }
