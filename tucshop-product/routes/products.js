const express = require('express');
const Products = require('../models/products');
const mongo = require('mongoose');

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

router.get('/:id', async (req, res) => {
    try{
        const product = await Products.find({"_id": new mongo.Types.ObjectId(req.params.id)});
        res.status(200).json(product);
    }
    catch(err){
        res.json({message: err.message});
    }
});

router.get('/title', async (req, res) => {
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

router.put('/:id', async (req, res) => {
    const item = {
        Title: req.body.Title,
        Image: req.body.Image,
        Description: req.body.Description,
        Price: req.body.Price,
        Units: req.body.Units
    };

    try{
        const updatedProduct = await Products.updateOne({_id: req.params.id}, {$set: item});
        res.status(200).json(updatedProduct);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const deletedProduct = await Products.deleteOne({_id: req.params.id});
        res.status(200).json(deletedProduct);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

module.exports = router;