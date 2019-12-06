const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  id: String,
  name: String,
});

module.exports = mongoose.model("stock", StockSchema);
