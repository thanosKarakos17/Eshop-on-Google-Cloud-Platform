require('dotenv').config();
const express = require('express');
const mongo = require('mongoose');
const app = express();
const cors = require('cors');

mongo.connect(process.env.MONGO_URL);
const db = mongo.connection;

db.on('open', () => {console.log('connected to db');app.listen(5000, () => {console.log('server started')})});
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);