const mongoose = require('mongoose');
//old model used to test, will be replaced with json model
class Stock {
  constructor() {
    this.model = mongoose.model('stock', new mongoose.Schema({
      name: String
    }));
  }

  findOrCreate(stockName) {
    return this.model.findOne({ name: stockName })
      .then((stock) => {
        if (!stock) {
          return this.create(stockName);
        } 
        return stock;
      })
  }


  delete(stockName) {
    return this.model.findOneAndDelete({ name: stockName })
  }
}

module.exports = new Stock();