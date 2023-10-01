const { mongo, default: mongoose } = require("mongoose");
const Transaction = require("../models/transaction");
const Users = require("../models/user");

const create = async (req, res) => {
  try {
    const transcation = await Transaction.create(req.body);
    const user = await Users.findOne({
      _id: req.body.userId,
    }).then(async (value) => {
      await Users.findOneAndUpdate(
        {
          _id: req.body.userId,
        },
        {
          balance: value - req.body.amount,
        }
      );
    });
    req.send(transcation);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = { create };



need to do a backend for cedit card addition basic using username adn creditcard and pincode; use mongodb mongoose to form a scheme accordingly and make update, delete , encrypt and decrypt method .. write step wise step and code with respective file for very begineer;;;;;