// code1----->
// const http = require('http');
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.end('Hello from Docker!');
// });

// server.listen(port, () => {
//   console.log(`Server running at port ${port}`);
// });

// code2---->
// const http = require('http');
// const { MongoClient } = require('mongodb');

// const port = 3000;
// const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/mydb';

// const server = http.createServer(async (req, res) => {
//   try {
//     const client = new MongoClient(mongoUrl);
//     await client.connect();
//     const db = client.db();
//     const collections = await db.listCollections().toArray();
//     res.statusCode = 200;
//     res.end(`Connected to MongoDB! Collections: ${collections.length}`);
//     await client.close();
//   } catch (err) {
//     res.statusCode = 500;
//     res.end('MongoDB connection failed: ' + err.message);
//   }
// });

// server.listen(port, () => {
//   console.log(`Server running at port ${port}`);
// });

// code3--->

const http = require("http");
const { MongoClient } = require("mongodb");

// Load environment variables (if running locally with a .env file)
require("dotenv").config();

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/mydb";

const server = http.createServer(async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db(); // Use default DB from connection string
    const collections = await db.listCollections().toArray();

    res.statusCode = 200;
    res.end(`✅ Connected to MongoDB! Collections: ${collections.length}`);

    await client.close();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    res.statusCode = 500;
    res.end("❌ MongoDB connection failed: " + err.message);
  }
});

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
