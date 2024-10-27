const express = require('express');
const Orders = require('../models/orders');
const mongo = require('mongoose');

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

router.post('/', async (req, res) => {
    const order = new Orders({
        Products: req.body.Products,
        Status: req.body.Status,
        Total_Price: req.body.Total_Price
    });
    try{
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }

});

module.exports = router;