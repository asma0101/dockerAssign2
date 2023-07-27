const express = require("express");
const morgan = require("morgan");
const { MY_CONSTANTS } = require("./lib/constants");
const { sendMsg } = require("./lib/rmq");

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is users service");
});

app.post("/users", (req, res) => {
  sendMsg(MY_CONSTANTS.USER_SERVICE_QUEUE, req.body);
  res.send("This is users service");
});

app.listen(3000, () => {
  console.log(`Shipping service is running on port 3008`);
});
