const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create Schema
const CartSchema = new Schema({    
    email: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    rating: {
        type: String,
        required: false,
    }
});

module.exports = Cart = mongoose.model('cart', CartSchema, global.data.mongodb.collections.cart.name);
