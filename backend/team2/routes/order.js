
var express = require('express')
var app = express()
var router = express.Router()
const { fetchAllOrders, addOrders } = require('../controllers/order')
const Order = require('../model/order')
const advancedFind = require('../middleware/advancedFind');

router.route('/')
    .get(advancedFind(Order), fetchAllOrders)
    .post(addOrders)

module.exports = router

