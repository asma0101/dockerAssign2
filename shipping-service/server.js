const express = require("express");
const morgan = require("morgan");
const axios = require('axios');
const { sendMsg } = require("../lib/rmq");
const { MY_CONSTANTS } = require("../lib/constants");

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is shipping service");
});

app.post("/shipping", async (req, res) => {
  try {
    // Send the req.body object to billing-service
    // await axios.post('http://billing-service:3006/billing', req.body);
    sendMsg(MY_CONSTANTS.DATA_SERVICE_QUEUE, req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3008, () => {
  console.log(`Shipping service is running on port 3008`);
});
