const http = require('http');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

const server = http.createServer(async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl, {
      tls: true,
    });

    await client.connect();
    const db = client.db(); // you can also specify db name like client.db("test")
    const collections = await db.listCollections().toArray();

    res.statusCode = 200;
    res.end(`✅ Connected to MongoDB Atlas! Collections: ${collections.length}`);
    await client.close();
  } catch (err) {
    res.statusCode = 500;
    res.end('❌ MongoDB connection failed: ' + err.message);
  }
});

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
