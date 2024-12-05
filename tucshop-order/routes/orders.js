const express = require('express');
const Orders = require('../models/orders');
const kafka = require('../kafka_service/kafka');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const orders = await Orders.find();
        res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/username', async (req, res) => {
    try{
        const order = await Orders.find({"Username": req.body.Username});
        res.status(200).json(order);
    }
    catch(err){
        res.json({message: err.message});
    }
});

router.post('/', async (req, res) => {
    const order = new Orders({
        Products: req.body.Products,
        Status: req.body.Status,
        Total_Price: req.body.Total_Price,
        Username: req.body.Username
    });
    try{
        const newOrder = await order.save();
        //send to kafka
        const msg = {
            Id: newOrder['_id'],
            products: newOrder.Products
        };
        const [kafkaOrderId, kafkaOrderStatus] = await kafka.kafkaProducer(msg);
        const kafkaOrder = new Orders({
            Products: req.body.Products,
            Status: kafkaOrderStatus,
            Total_Price: req.body.Total_Price,
            Username: req.body.Username
        });
        await kafkaOrder.save();

        res.status(201).json(newOrder);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }

});

module.exports = router;