const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is users service");
});

app.post("/users", (req, res) => {
  res.send("This is users service");
});

app.listen(3003);
