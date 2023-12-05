var express = require('express')
var router = express.Router()
const { Product,Review } = require('../../../model/productModel')
const Handlebars = require('hbs')
var paginate = require('handlebars-paginate')
 
Handlebars.registerHelper('paginate', paginate)

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  if(arg1 == arg2){
    return options.fn(this)
  }
});

router.get('/', async (req, res, next) => {
  let perPage = 9;
  let page = parseInt(req.query.page) || 1
  const selectedName = req.query.product_name;
  const selectedCategories = req.query.category;
  const selectedManufacturer = req.query.manufacturer;
  const selectedMinPrice = parseInt(req.query.price_min);
  const selectedMaxPrice = parseInt(req.query.price_max);
  const sortBy = req.query.sort_by
  const sortOrder = req.query.sort_order


  let filter = {}
  if(selectedName){
    filter.product_name = {'$regex': selectedName,$options:'i'}
  }
  if(selectedCategories){
    filter.category = selectedCategories
  }
  if(selectedManufacturer){
    filter.manufacturer = selectedManufacturer
  }
  if(selectedMinPrice && selectedMaxPrice){
    filter.price = {$gte: selectedMinPrice, $lte: selectedMaxPrice}
  }
  let ssort = []
  if(sortBy){
    ssort = [[sortBy, sortOrder]]
  }

  const products = await Product
    .find(filter)
    .sort(ssort)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .lean()
    .exec();  

  const categories = await Product.distinct('category');
  const manufacturers = await Product.distinct('manufacturer');

  const count =  await Product.find(filter).countDocuments();

    res.render('user/collection/index', {
      products: products,
      pagination: {
        current: page, 
        page,
        pageCount: Math.ceil(count / perPage)
      },
      layout: 'user/layout.hbs',
      categories,
      manufacturers,
      currentFilter: {
        product_name: selectedName,
        category: selectedCategories,
        manufacturer: selectedManufacturer,
        min_price: selectedMinPrice,
        max_price: selectedMaxPrice,
        sort_by: sortBy,
        sort_order: sortOrder
      }
    })
})

module.exports = router