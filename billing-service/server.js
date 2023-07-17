const express = require("express");
const morgan = require("morgan");
const axios = require('axios');
const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is billing service");
});

app.post("/billing", (req, res) => {
  // Log the object received from the shipping-service
  console.log(req.body);
  res.send(req.body)
});

app.listen(3006, () => {
  console.log(`Billing service is running on port 3006`);
});
