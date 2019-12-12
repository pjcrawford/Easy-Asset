const express = require('express');
const router = express.Router();
const StockData = require('../utils/index')
const stockData = new StockData();
const Stocks = require('../models/stocks');
const fs = require('fs');
const finalHandler = require('finalhandler');
const queryString = require('querystring');
const Router = require('router');
const bodyParser = require('body-parser');
// const path = require('path');
// const requireSignin = passport.authenticate('login', { session: false });


const stockList = require("../stockschema/stock_data.json");

router.get('/stocks', (req, res) => {
  res.writeHead(200, Object.assign({ 'Content-Type': 'application/json' }))
  res.end(JSON.stringify(stockList))
});


router.get('/stocks/:symbol_name', (req, res, next) => {
  const symbolName = req.params.symbol_name;
  if (!symbolName) {
    alert('stock not found')
    res.end();
  } else {
    let stockCheck = stockList.find(s => s.ticker === symbolName)
    res.send(stockCheck)

    
      }
    }
)


router.get('/add/:symbol', (req, res) => {
  const newStock = new Stocks.model({ name: req.params.symbol})
  newStock.save().then((saved) => {
    res.json(saved);
  })
  .catch((err) => {
    res.end();
  })
})

router.delete('/:symbol_name', (req, res) => {
  Stocks.model.remove({ name: req.params.symbol_name })
    .then((data) => {
      if (data) {
        res.end('deleted');
      }
      res.end();
    })
})


module.exports = router;


