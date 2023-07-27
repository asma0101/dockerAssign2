const username = 'guest';
const password = 'guest';
const MY_CONSTANTS = {
    WEB_HOOK_QUEUE: 'WEB_HOOK_QUEUE',
    DATA_SERVICE_QUEUE: 'DATA_SERVICE_QUEUE',
    USER_SERVICE_QUEUE: 'USER_SERVICE_QUEUE',
    SHIPPING_SERVICE_QUEUE: 'SHIPPING_SERVICE_QUEUE',
    BILLING_SERVICE_QUEUE: 'BILLING_SERVICE_QUEUE',
    CONNECTION_STRING: `amqp://${username}:${password}@rabbitmq:5672`
}
module.exports = { MY_CONSTANTS };