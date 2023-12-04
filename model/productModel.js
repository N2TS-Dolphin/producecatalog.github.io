const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: String,
    price: Number,
    product_img: String,
    status: String,
    category: String,
    manufacturer: String,
    creation_time: Date
}, {collection: 'product'});

module.exports = mongoose.model('product', productSchema, 'product');