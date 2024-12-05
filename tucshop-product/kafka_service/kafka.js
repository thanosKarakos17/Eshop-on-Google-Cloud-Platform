const Products = require('../models/products');
const { Kafka, Partitioners } = require('kafkajs');

const handleProducts = async (orders)=>{
    try {
        //check if products amount is > 0
        for await (const obj of orders.products){
            const data = await Products.find({"_id": obj.product_id});

            const quantity = data[0].Units;
            if(quantity && quantity < obj.amount){
                return false;
            }
        }

        for await (const obj of orders.products){
            const data = await Products.find({"_id": obj.product_id});

            const newQuantity = data[0].Units - obj.amount;
            const item = {
                Title: data.Title,
                Image: data.Image,
                Description: data.Description,
                Price: data.Price,
                Units: newQuantity,
                Username: data.Username
            };
            const update = await Products.updateOne({_id: req.params.id}, {$set: item});
        }

        return true

    } catch (error) {
        console.log(error.message);
        throw new Error(error);
    }
}
///////////////////////////////////////////////
const kafka = new Kafka({
    clientId: 'products-app',
    brokers: ['localhost:8097'],
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
      topic: 'productsProducer',
      messages: [{
          value: JSON.stringify(msg)
      }]
   });
  
   await producer.disconnect();
  }
  
  const consumer = kafka.consumer({
      groupId: "products-group",
      allowAutoTopicCreation: true,
  });
  
  const fetchProductsFromOrderTopic = async ()=>{
    try {
      await consumer.connect();
      await consumer.subscribe({topics: ["ordersProducer"]});
  
      await consumer.run({
        eachMessage: async ({message}) => {
          const jsonMsg = JSON.parse(message.value);
          const result = await handleProducts(jsonMsg);
          
          if(result){
            return [jsonMsg.Id, 'Success'];
          }
  
          if(!result){
            return [jsonMsg.Id, 'Reject'];
          }
  
        }
      });
    } catch (error) {               
      await consumer.disconnect();
      console.log(error.message);
    }
  }
  
  setTimeout(async ()=>{
    try {
      await fetchProductsFromOrderTopic();
    } catch (error) {
      console.log(error.message);
    }
  },2000);