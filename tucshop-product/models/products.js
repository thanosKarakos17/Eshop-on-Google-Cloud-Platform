const mongo = require('mongoose');

const productSchema = new mongo.Schema({
    Title: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: false
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Units: {
        type: Number,
        required: false,
        default: 1
    }
});

module.exports = mongo.model('Products', productSchema);