const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

//# Middleware :
app.use(express.json());
app.use(cors());

//# Route Route Console Log :
app.get("/", (req, res) => {
  res.send("Fly With Me Server Running Perfectly....");
});

//# MongoDB Setup :
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cqqhz9d.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    client.connect((err) => {});
  } finally {
  }
}

//# Get All Data From Server :
const servicesCollection = client.db("FlyWithMe").collection("Services");

//# Get First Three Services From Server:
app.get("/service", async (req, res) => {
  const query = {};
  const cursor = servicesCollection.find(query).sort({ $natural: -1 }).limit(3);
  const result = await cursor.toArray();
  res.send(result);
});

//# Get All Services From Server:
app.get("/services", async (req, res) => {
  const query = {};
  const cursor = servicesCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
});

//# Get Services Details By Using ID :
app.get("/services/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const cursor = await servicesCollection.findOne(query);
  res.send(cursor);
});

//# Add To Services :
app.post("/services", async (req, res) => {
  const service = req.body;
  const result = await servicesCollection.insertOne(service);
  res.send(result);
});

const reviewCollection = client.db("FlyWithMe").collection("reviews");
//# Add Review To Server :
app.post("/reviews", async (req, res) => {
  const reviews = req.body;
  const result = await reviewCollection.insertOne(reviews);
  res.send(result);
});

//# Get All The Review :
app.get("/reviews", async (req, res) => {
  const query = {};
  const cursor = reviewCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

//# Find Review By Id :
app.get("/reviews/:id", async (req, res) => {
  const id = req.params.id;
  const query = { serviceId: id };
  const result = await reviewCollection.findOne(query);
  res.send(result);
});
run().catch((error) => console.log(error));

//# Server Console Log :
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
