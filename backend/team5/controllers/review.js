// import asyncHandler from 'express-async-handler'
const asyncHandler = require('express-async-handler');

//const BookReview = require('../model/review.js')

const Books = require('../../team4/model/books')
const  Reviews = require('../model/review')

const findAllreview = asyncHandler(async(req, res)=>{
  res.status(200).json(res.advancedResults);
})


// import Product from '../model/review.js'

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    //console.log("req.params._id",req.params.id)
    //const product = await Books.find({id:req.params.id})
    //const product = await Reviews.findById(req.params.id)
    //console.log("product",product)
  
  //  if (product) {
  //    const alreadyReviewed = product.reviews.find(
  //      (r) => r.user.toString() === req.user._id.toString()
  //    )

   //   if (alreadyReviewed) {
   //     res.status(400)
   //     throw new Error('Product already reviewed')
   //   }
      
      const review = {
        
        rating: Number(rating),
        comment,
        user : req.body.user,
        book : req.body.book
      }
      const product = await Reviews.create(review)

    
      // product.reviews.push(review)
  
      // product.numReviews = product.reviews.length
  
      // product.rating =
      //   product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      //   product.reviews.length
  
      // await product.save()
      res.status(201).json({ message: 'Review added', review: product })
  //  } 
    //else {
    //  res.status(404)
    //  throw new Error('Product not found')
  //  }
  })

//  export {createProductReview}

 module.exports = {createProductReview, findAllreview};