const mongoose = require('mongoose');
//old model used to test, will be replaced with json model
class Stocks {
  constructor() {
    this.model = mongoose.model('stock', new mongoose.Schema({
      name: String,
      
    }));
  }

  async findOrCreate(stockName) {
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

module.exports = new Stocks();