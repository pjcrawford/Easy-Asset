const mongoose = require(`mongoose`);
const Schema = mongoose.Schema


const StockSchema = new Schema({
    symbol: { type: String },
    name: { type: String },
    industry: { type: String },
    price: { type: Number },
  
});

module.exports = mongoose.model('Stock', StockSchema)