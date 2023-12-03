const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    quantity: Number,
    state: String,
    category: String,
    manufacturer: String,
    creationtime: Date
}, {collection: 'product'});

module.exports = mongoose.model('product', productSchema, 'product');