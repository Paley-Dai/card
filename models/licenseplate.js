const mongoose = require("mongoose");

const LicensePlateSchema = new mongoose.Schema({
  plateNumber: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const LicensePlate = mongoose.model("LicensePlate", LicensePlateSchema);

module.exports = LicensePlate;
