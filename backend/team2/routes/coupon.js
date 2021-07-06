var express = require('express')
var app = express()
var router = express.Router()
const { fetchAllCoupons, addCoupons } = require('../controllers/coupon')
const Coupon = require('../model/coupon')
const advancedFind = require('../middleware/advancedFind');

router.route('/')
    .get(advancedFind(Coupon), fetchAllCoupons)
    .post(addCoupons)

router.post('/compare', (req, res, next) => {
    Coupon.findOne({ couponcode: req.body.couponcode })
        .then(result => {
            res.status(201).json({
                message: 'succeeeeeess',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})

router.delete('', (req, res, next) => {
    Coupon.deleteOne({ couponcode: req.body.couponcode })
        .then(result => {
            res.status(201).json({
                message: 'succeeeeeess',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})


module.exports = router