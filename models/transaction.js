const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
});

const Transaction = mongoose.model("Transactions", TransactionSchema);

module.exports = Transaction;
