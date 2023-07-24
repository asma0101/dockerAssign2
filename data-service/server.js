const express = require("express");
const morgan = require("morgan");
const { MY_CONSTANTS } = require("../lib/constants");
const amqp = require('amqplib');

const app = express();

app.use(morgan("combined"));
app.use(express.json());

async function main() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(MY_CONSTANTS.DATA_SERVICE_QUEUE);

    channel.consume(MY_CONSTANTS.DATA_SERVICE_QUEUE, (message) => {
      if (message !== null) {
        console.log('Received message:', message.content.toString());
        channel.assertQueue(MY_CONSTANTS.WEB_HOOK_QUEUE);
        channel.sendToQueue(MY_CONSTANTS.WEB_HOOK_QUEUE, message.content);
        channel.ack(message);
      }
    });

    console.log('Data service is waiting for messages...');
  } catch (error) {
    console.error('Error:', error.message);
  }
}
main();
app.listen(5005);
