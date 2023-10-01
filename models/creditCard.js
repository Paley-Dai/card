const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema({
  username: String,
  creditCardNumber: String, // Store encrypted credit card data
  pinCode: String, // Store encrypted pin code
  balance: { type: Number, default: 0 },
});

const CreditCard = mongoose.model("CreditCard", creditCardSchema);

module.exports = CreditCard;
