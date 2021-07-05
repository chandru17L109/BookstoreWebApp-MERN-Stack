const Orders = require('../model/order')
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
// const addOrders = asyncHandler(async (req, res, next) => {
//     query = { email: req.body.email }; //req.body
//     let finduser = await Orders.find(query)

//     if (finduser.length !== 0) {
//         console.log(req.body);
//         try {
//             const AddressRes = await AddressUser.updateMany({ email: req.body.email },
//                 {
//                     $push: {
//                         addresses: req.body.addresses
//                     }
//                 }, { new: true })


//             console.log(AddressRes)
//             res.status(200).send(AddressRes)
//         } catch (err) {
//             console.log(err);
//         }

//     } else {
//         let item = await AddressUser.create(req.body)
//         res.json({ message: true, res: item });

//     }

// });

module.exports = { fetchAllOrders, addOrders }