const express = require("express");
const morgan = require("morgan");
const axios = require('axios');
const { sendMsg } = require("../lib/rmq");
const { MY_CONSTANTS } = require("../lib/constants");
const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is billing service");
});

app.post("/billing", (req, res) => {
  // Log the object received from the shipping-service
  console.log(req.body);
  sendMsg(MY_CONSTANTS.DATA_SERVICE_QUEUE, req.body);
  res.send(req.body)
});

app.listen(3006, () => {
  console.log(`Billing service is running on port 3006`);
});
