var express = require('express')
var router = express.Router()
const { Product,Review } = require('../../../model/productModel')
const Handlebars = require('hbs')
var paginate = require('handlebars-paginate')
 
Handlebars.registerHelper('paginate', paginate)

Handlebars.registerHelper('ifFirstPage', function(currentPage, options){
  return (currentPage == 1) ? options.fn(this): options.inverse(this)
})

Handlebars.registerHelper('ifLastPage', function(currentPage, pageCount, options){
  return (currentPage == pageCount) ? options.fn(this): options.inverse(this)
})

Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
      
  return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
  }[operator];
});

/* GET home page. */
router.get('/', async (req, res, next) => {
  let perPage = 9; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.query.page || 1

  const products = await Product
    .find() // find tất cả các data
    .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .lean()
  const count =  await Product.count

    res.render('user/collection/index', {
      products: products, // sản phẩm trên một page
      pagination: {
        currentPage: page, 
        pageCount: Math.ceil(count / perPage)
      },
      productCount: count,
      layout: 'user/layout.hbs'
    })
})

module.exports = router