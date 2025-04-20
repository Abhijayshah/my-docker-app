const http = require('http');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

const server = http.createServer(async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true, // This is the key fix for Render + Atlas
    });

    await client.connect();
    const db = client.db(); // or specify a db name e.g., client.db('test')
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


