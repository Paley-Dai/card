const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
    default: 0,
  },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
