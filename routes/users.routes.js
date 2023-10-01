const express = require("express");
const user = require("../controllers/users.controllers");

const usersRoute = express.Router();

usersRoute.post("/create", user.add);

module.exports = { usersRoute };
