const amqp = require('amqplib');
const { MY_CONSTANTS } = require('./constants');

const sendMsg = async (queueName, message) => {
  let connection;
  try {
     connection = await amqp.connect(MY_CONSTANTS.CONNECTION_STRING);
    let channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    console.log(" [x] Sent '%s'", message);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
};


const receiveMsg = async(queueName) => {
  try {
    let connection = await amqp.connect(MY_CONSTANTS.CONNECTION_STRING);
    let channel = await connection.createChannel();

    await channel.assertQueue(queueName);
    channel.consume(queueName, (message) => {
      if (message !== null) {
        console.log('Received message:', message.content.toString());
      }
    }, {noAck: true});
  } catch (error) {
    console.error('Error:', error.message);
  }
}
module.exports = {
  sendMsg, receiveMsg
};
