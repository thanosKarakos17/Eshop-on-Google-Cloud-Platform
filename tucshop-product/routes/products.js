const express = require('express');
const Products = require('../models/products');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const products = await Products.find();
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});
/*
router.get('/:id', async (req, res) => {
    try{
        const product = await Products.find({"_id": req.params.id});
        res.status(200).json(product);
    }
    catch(err){
        res.json({message: err.message});
    }
});*/

router.get('/title', async (req, res) => {
    console.log(req)
    try{
        const product = await Products.find({"Title": req.query.title});
        res.status(200).json(product);
    }
    catch(err){
        res.json({message: err.message});
    }
});

router.post('/', async (req, res) => {
    const product = new Products({
        Title: req.body.Title,
        Image: req.body.Image,
        Description: req.body.Description,
        Price: req.body.Price,
        Units: req.body.Units
    });
    try{
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }

});

module.exports = router;