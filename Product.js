const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create Schema
const ProductSchema = new Schema({
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
    },
});

module.exports = Product = mongoose.model('product', ProductSchema, global.data.mongodb.collections.products.name);
