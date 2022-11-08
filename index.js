const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

//# Middleware :
app.use(express.json());
app.use(cors());

//# Route Route Console Log :
app.get("/", (req, res) => {
  res.send("Fly With Me Server Running Perfectly....");
});

//# Server Console Log :
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
