const express = require('express');
const router = express.Router();
const StockData = require('./../utils/index')
const stockData = new StockData();
const Stocks = require('../models/stocks');
const path = require('path');


router.get('/:symbol_name', (req, res) => {
  const symbolName = req.params.symbol_name;
  stockData.getStockData(symbolName)
    .then((response) => {
      if (response.data) {
        Stocks.findOrCreate(symbolName)
          .then((stock) => {
            res.json({
              name: symbolName,
              data: stockData.parseStockData(response.data)
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
router.get('/delete/all', (req, res) => {
  Stocks.model.remove().then((deleted) => res.json(releted))
})

//to be uncommented once reducers are finalized

// router.get("/current_user", UserAuthCheck, (req, res) => {
//   res.send(req.user);
// });


// when login is successful, retrieve user info
// router.get("/login/success", UserAuthCheck, (req, res) => {
//   console.log("login/success accessed");
//   console.log(req.user);
//   if (req.user) {
//     res.json({
//       success: true,
//       message: "user has successfully authenticated",
//       user: req.user,
//     });
//   }
// });
module.exports = router;


