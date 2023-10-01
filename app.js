const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cors = require("cors");
const db = require("./ds");
const User1 = require("./models/user");
const Transaction = require("./models/transaction");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const users = require("../controllers/users.controllers");

app.post("/api/user/create", add);

// // Example user creation route
// app.post("/api/users", async (req, res) => {
//   try {
//     const { name, creditCardNumber, balance } = req.body;
//     const user = new User({ name, creditCardNumber, balance });
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

// Define your API routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
