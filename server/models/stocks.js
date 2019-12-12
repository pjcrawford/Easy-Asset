const mongoose = require('mongoose');

class Stocks {
  constructor() {
    this.model = mongoose.model('stock', new mongoose.Schema({
      name: String,
      company: String,
      EPS: Number,
      EBITDA: Number,
      PE: Number,
      ROA: Number,
      ROE: Number,
      OverallRisk: String,
      
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
    return this.model.create(
      { name: stockName },
      { company: stockName },
      { EPS: stockName },
      { EBITDA: stockName },
      { PE: stockName },
      { ROA: stockName },
      { ROE: stockName },
      { OverallRisk: stockName },
      { imageUrl: stockName })
  }

  delete(stockName) {
    return this.model.findOneAndDelete({ name: stockName })
  }
  
}

module.exports = new Stocks();