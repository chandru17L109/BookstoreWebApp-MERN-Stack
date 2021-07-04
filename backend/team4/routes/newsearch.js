var express = require('express')
var router = express.Router()
const query_find = require('../middleware/query_params');
const {findAlldata,insertdata,findDataBasedOnSearchItem, findDataBasedOnBookid} = require('../../team4/controllers/newsearch')
const { createProductReview, findAllreview,AverageRating}  =  require('../../team5/controllers/review')
const Reviews  = require('../../team5/model/review')

const Book = require('../model/books');


router.route('/review')
 .get(query_find(Reviews),findAllreview)
 .post(createProductReview)

router.route('/review/avgrating')
 .get(query_find(Reviews),AverageRating)

router.route('/')
 .get(query_find(Book),findAlldata)
 .post(insertdata)

router.route('/CommonSearch/:searchitem')
 .get(findDataBasedOnSearchItem)

router.route('/:id')
.get(findDataBasedOnBookid)

module.exports = router
