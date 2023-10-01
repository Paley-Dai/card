const Users = require("../models/user");

const add = async (req, res) => {
  try {
    const users = await Users.create(req.body);
    return res.send(users);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

module.exports = { add };
