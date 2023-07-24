// imports
const express = require("express");
const morgan = require("morgan");
const amqp = require('amqplib');


const { receiveMsg } = require("../lib/rmq");
const { MY_CONSTANTS } = require("../lib/constants");


// init express app
const app = express();

// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

receiveMsg(MY_CONSTANTS.WEB_HOOK_QUEUE);

app.listen(5008);
