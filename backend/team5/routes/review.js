// import express from 'express'
var express = require('express')
import { createProductReview } from '../controllers/review.js'
import { protect } from '../middleware/authMiddleware.js'


var router = express.Router()

 
//  router.route('/').get(getProducts).post(protect)
 router.route('/:id/reviews').post(protect, createProductReview)
//  router.route('/:id').get(getProductById).put(protect)
 

module.exports = router