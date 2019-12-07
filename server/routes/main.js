const router = require("express").Router();
const Stock = require("../models/stock");
const API_KEY = 'QJ3VIT49U76EATUU';
const ROOT_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
const axios = require('axios').default;
const StockData = require('./../utils/index');

// router.get('/', (req, res, next) => {
  
//     Stocks.model.find()
//       .then((stockList) => {
//         res.json(stockList.map((stock) => stock.name));
//       })
//   });

router.get('/:stock_symbol', (req, res) => {
    const stockSymbol = req.params.stock_symbol;
    const newStockData = new StockData;
    if (!stockSymbol) {
        throw new Error("Ticker not found");
    }
    newStockData.getStockData(stockSymbol)
      .then((response) => {
        if (response.data) {
          Stock.add(stockSymbol)
            .then((stock) => {
              res.json({
                name: stockSymbol,
                data: newStockData.parseStockData(response.data)
              });
            })
            .catch((err) => {
              console.log(err);
              res.json({err: 'error'});
            })
        } else {
          res.json({ empty: ''})
        }
      }).catch((err) => {
        res.status(500).json({error: err.error})
      })
  })
  
module.exports = router;
