const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://sinhaaryan173_db_user:Aryan7293@cluster-main.23eatil.mongodb.net/test";

async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("✅ Connected successfully");
  await client.close();
}

run().catch(console.error);
