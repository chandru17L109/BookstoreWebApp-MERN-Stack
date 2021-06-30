// import express from 'express'
var express = require('express')

// import { createProductReview } from '../controllers/review.js'

// import { protect } from '../middleware/authMiddleware.js'
// const { protect }  =  require('../middleware/authMiddleware.js')

var router = express.Router()

const { createProductReview }  =  require('../controllers/review.js')


 
//  router.route('/').get(getProducts).post(protect)
//  router.route('/:id').get(getProductById).put(protect)

router.route('/:id')
 .post(createProductReview)
 

module.exports = router