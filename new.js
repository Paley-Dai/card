const mongosoe = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MongoClient = mongodb.MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  const databaseName = "yourDatabaseName"; // Replace with your actual database name
  const collectionName = "yourCollectionName"; // Replace with your actual collection name

  const collection = client.db(databaseName).collection(collectionName);

  // Now you can perform actions on the collection object

  // Example: Find all documents in the collection
  collection.find({}).toArray((err, documents) => {
    if (err) {
      console.error("Error querying collection:", err);
      return;
    }
    console.log("Documents:", documents);

    // Close the MongoDB connection when done
    client.close();
  });
});
