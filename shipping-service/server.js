const express = require("express");
const morgan = require("morgan");
const axios = require('axios');

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is shipping service");
});

app.post("/shipping", async (req, res) => {
  try {
    // Send the req.body object to billing-service
    await axios.post('http://localhost:3008/billing', req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3002, () => {
  console.log(`Shipping service is running on port 3002`);
});
