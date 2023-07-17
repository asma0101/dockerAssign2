const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is inventory service");
});

app.post("/inventory", (req, res) => {
  res.send("This is inventory service");
});

app.listen(3001);
