const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Configure body-parser to parse JSON requests
app.use(bodyParser.json());

// Define routes and middleware next

const CreditCard = require("./models/creditCard");

// Add a new credit card
app.post("/api/credit-cards", async (req, res) => {
  try {
    const { username, creditCardNumber, pinCode } = req.body;
    // Encrypt credit card and pin code before saving to the database
    // You can use a library like 'crypto' or 'bcrypt' for encryption
    // Insert logic here to handle encryption

    const newCreditCard = new CreditCard({
      username,
      creditCardNumber,
      pinCode,
    });
    await newCreditCard.save();
    res.status(201).json(newCreditCard);
  } catch (err) {
    res.status(400).json({ error: err.message });
    11;
  }
});

// Update a credit card by ID
app.put("/api/credit-cards/:id", async (req, res) => {
  try {
    const { username, creditCardNumber, pinCode } = req.body;
    const updatedCreditCard = await CreditCard.findByIdAndUpdate(
      req.params.id,
      { username, creditCardNumber, pinCode },
      { new: true }
    );
    res.json(updatedCreditCard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a credit card by ID
app.delete("/api/credit-cards/:id", async (req, res) => {
  try {
    await CreditCard.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch all credit cards
app.get("/api/credit-cards", async (req, res) => {
  try {
    const creditCards = await CreditCard.find({});
    res.json(creditCards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/credit-cards/add-money", async (req, res) => {
  try {
    const { addedMoney, creditCardNumber } = req.body;
    const creditCard = await CreditCard.findOne(req.params.id);
    const updatedCreditCard = await CreditCard.findOneAndUpdate(
      {
        creditCardNumber: creditCardNumber,
      },
      {
        balance: creditCard.balance + addedMoney,
      },
      {
        new: true,
      }
    );
    res.json(updatedCreditCard);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Fetch all credit cards
app.get("/api/credit-cards", async (req, res) => {
  try {
    const creditCards = await CreditCard.find({});
    res.json(creditCards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/credit-cards/subract-money", async (req, res) => {
  try {
    const { subractedMoney, creditCardNumber } = req.body;
    const creditCard = await CreditCard.findOne(req.params.id);
    const updatedCreditCard = await CreditCard.findOneAndUpdate(
      {
        creditCardNumber: creditCardNumber,
      },
      {
        balance: creditCard.balance - subractedMoney,
      },
      {
        new: true,
      }
    );
    res.json(updatedCreditCard);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

const fs = require("fs");
const LicensePlate = require("./models/licenseplate");

let jsonData = JSON.parse(fs.readFileSync("fin.json", "utf-8"));

async function timeInterval() {
  console.log("here");
  // Read the JSON data from the file "fin.json"
  const updatedJsonData = JSON.parse(fs.readFileSync("fin.json", "utf-8"));

  if (JSON.stringify(jsonData) !== JSON.stringify(updatedJsonData)) {
    // Function to insert data into MongoDB
    async function insertData() {
      try {
        // Insert the JSON data into the collection
        const result = await LicensePlate.create({
          plateNumber: jsonData.plate_number,
        });
        jsonData = updatedJsonData;
        console.log(`Inserted document with _id: ${result.insertedId}`);
      } catch (err) {
        console.error("Error inserting data:", err);
      }
    }
    insertData();
  }
  setInterval(() => {
    timeInterval();
  }, 5000);
}

timeInterval();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
