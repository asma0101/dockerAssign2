const express = require("express");
const morgan = require("morgan");
const { MY_CONSTANTS } = require("./lib/constants");

const amqp = require('amqplib');

const app = express();

app.use(morgan("combined"));
app.use(express.json());


async function main() {
  try {
    const connection = await amqp.connect(MY_CONSTANTS.CONNECTION_STRING);
    const channel = await connection.createChannel();

    await consumeMessage(channel, MY_CONSTANTS.USER_SERVICE_QUEUE);
    await consumeMessage(channel, MY_CONSTANTS.SHIPPING_SERVICE_QUEUE);
    await consumeMessage(channel, MY_CONSTANTS.BILLING_SERVICE_QUEUE);

    console.log('Data service is waiting for messages...');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function consumeMessage(channel, queueName) {
  await channel.assertQueue(queueName);
  channel.consume(queueName, (message) => {
    if (message !== null) {
        console.log(`Message received from queue ${queueName}`, message.content.toString());
        channel.assertQueue(MY_CONSTANTS.WEB_HOOK_QUEUE);
        channel.sendToQueue(MY_CONSTANTS.WEB_HOOK_QUEUE, message.content);
        channel.ack(message);
      }
  })
}
main();
app.listen(5009);
