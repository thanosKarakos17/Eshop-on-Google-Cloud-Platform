require('dotenv').config();
const express = require('express');
const mongo = require('mongoose');
const app = express();

mongo.connect(process.env.MONGO_URL);
const db = mongo.connection;

db.on('open', () => console.log('connected to db'));
app.use(express.json());
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);
app.listen(5000, () => {console.log('started')})