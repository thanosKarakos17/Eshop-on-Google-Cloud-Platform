const mongo = require('mongoose');

const orderSchema = new mongo.Schema({
    Products: {
        type: [
            {
                title: String,
                amount: Number,
                id: mongo.Types.ObjectId
            }
        ],
        required: true
    },
    Status: {
        type: String,
        enum: ['Pending', 'Success', 'Reject'],
        required: true
    },
    Total_Price: {
        type: Number,
        required: true
    }
});

module.exports = mongo.model('Orders', orderSchema);