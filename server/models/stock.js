const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class Stock {
  constructor() {
    this.model = mongoose.model('stock', new Schema({
      name: String
    }));
  }

  async add(stockName) {
    const stock = await this.model.findOne({ name: stockName });
    if (!stock) {
      return this.create(stockName);
    }
    return stock;
  }

  create(stockName) {
    return this.model.create({ name: stockName })
  }

  delete(stockName) {
    return this.model.findOneAndDelete({ name: stockName })
  }
}

module.exports = new Stock();