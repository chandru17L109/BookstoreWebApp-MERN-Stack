const Coupon = require('../model/coupon')
const asyncHandler = require('../middleware/async');


const fetchAllCoupons = asyncHandler(async (req, res, next) => {

    res.json(res.advancedResults);


})

const addCoupons = asyncHandler(async (req, res, next) => {

    let couponRes = await Coupon.create(req.body);
    console.log(couponRes);
    res.status(201).json({ success: true })

})


module.exports = { fetchAllCoupons, addCoupons }