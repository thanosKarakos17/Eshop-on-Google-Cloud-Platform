const { Kafka, Partitioners } = require('kafkajs')
const Orders = require('../models/orders');

const kafka = new Kafka({
  clientId: 'order-app',
  brokers: ['kafka:19092'],
  retry: {
    initialRetryTime: 2000,
    retries: 5
  }
});

const producer = kafka.producer({
    allowAutoTopicCreation: true,
    createPartitioner: Partitioners.LegacyPartitioner
});

const sendOrders = async (msg)=>{
 await producer.connect();
 await producer.send({
    topic: 'ordersProducer',
    messages: [{
        value: JSON.stringify(msg)
    }]
 });

 await producer.disconnect();
}

const consumer = kafka.consumer({
  groupId: "orders-group",
  allowAutoTopicCreation: true,
});

const fetchOrdersFromProductsTopic = async ()=>{
  try {
    await consumer.connect();
    await consumer.subscribe({topics: ["productsProducer"]});

    await consumer.run({
      eachMessage: async ({message}) => {
        const response = JSON.parse(message.value);
        const {orderId, status} = response;
        await Orders.updateOne({ _id: orderId }, { $set: { Status: status } });
      }
    });
  } catch (error) {               
    await consumer.disconnect();
    console.log(error.message);
  }
}

setTimeout(async ()=>{
  try {
    await fetchOrdersFromProductsTopic();
  } catch (error) {
    console.log(error.message);
  }
},2000);

module.exports = {
    kafkaProducer: sendOrders
}