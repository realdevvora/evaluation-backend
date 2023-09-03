const { MongoClient } = require("mongodb");
const data = require("./course_data.json")

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGO_URI

const client = new MongoClient(uri);

console.log(data != null)

async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("test");
    const coll = db.collection("courses");

    // insert code goes here
    const result = await coll.insertMany(data);

    // display the results of your operation
    console.log(result.insertedIds);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {run}