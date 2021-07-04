const Order = require('../model/order')
const asyncHandler = require('../middleware/async');


const fetchAllOrders = asyncHandler(async (req, res, next) => {

    res.json(res.advancedResults);


})


const addOrders = asyncHandler(async (req, res, next) => {
    console.log("request", req.body);
    let orderRes = await Order.create(req.body);
    console.log(orderRes);
    res.status(201).json({ success: true });
});


module.exports = { fetchAllOrders, addOrders }