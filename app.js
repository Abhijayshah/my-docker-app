// const http = require('http');
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.end('Hello from Docker!');
// });

// server.listen(port, () => {
//   console.log(`Server running at port ${port}`);
// });


const http = require('http');
const { MongoClient } = require('mongodb');

const port = 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/mydb';

const server = http.createServer(async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db();
    const collections = await db.listCollections().toArray();
    res.statusCode = 200;
    res.end(`Connected to MongoDB! Collections: ${collections.length}`);
    await client.close();
  } catch (err) {
    res.statusCode = 500;
    res.end('MongoDB connection failed: ' + err.message);
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
