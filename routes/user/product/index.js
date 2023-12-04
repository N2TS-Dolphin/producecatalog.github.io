var express = require('express');
var router = express.Router();
const Product = require('../../../model/productModel')

/* GET home page. */
router.get('/', async function(req, res, next) {
  let id = req.query.id.toString()
  const product = await Product.findById(id).lean()
  const relatedProduct = await Product.find({category: product.category}).limit(4).lean()

  res.render('user/product/index', {
    layout: 'user/layout.hbs', 
    product: product,
    relatedProduct: relatedProduct});
});

module.exports = router;
