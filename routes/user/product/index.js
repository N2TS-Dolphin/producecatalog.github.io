var express = require('express');
var router = express.Router();
const { Product, Review } = require('../../../model/productModel')

/* GET home page. */
router.get('/', async function(req, res, next) {

  const id = req.query.id.toString()
  const product = await Product.findById(id).lean()
  const reviews = await Review.find({product_id: product._id}).lean()
  const relatedProduct = await Product.find({category: product.category}).limit(4).lean()

  var product_rating = 0
  console.log(product_rating)
  for(let i = 0; i < reviews.length; i++){
    console.log(reviews[i].rating)
    product_rating = (product_rating + reviews[i].rating)
  }
  product_rating = product_rating / reviews.length
  console.log(product_rating)

  



  res.render('user/product/index', {
    layout: 'user/layout.hbs', 
    product: product,
    product_rating: product_rating,
    reviews: reviews,
    relatedProduct: relatedProduct});
});

router.post('/review', function(req, res){
  let product_id = req.query.id
  let name = req.body.review_name
  let rating = req.body.rating
  let content = req.body.content
 
  var newReview = new Review();
  newReview.product_id = product_id
  newReview.name = name
  newReview.rating = rating
  newReview.content = content
  if(rating > 0 || rating <= 5){
    newReview.save()
  }

  let product_url = '/product?id=' + product_id
  res.redirect(product_url)
})

module.exports = router;
