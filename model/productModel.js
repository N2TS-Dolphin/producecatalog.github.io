const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    state: String,
    category: String,
    manufacturer: String,
    creationtime: Date
}, {collection: 'products'});

module.exports = mongoose.model('products', productSchema, 'products');