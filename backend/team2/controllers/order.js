const Orders = require('../model/order')
const asyncHandler = require('../middleware/async');
const CartItem = require("../../team4/model/cart");


const fetchAllOrders = asyncHandler(async (req, res, next) => {

    res.json(res.advancedResults);


})


const addOrders = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const emptyCart = await CartItem.updateMany({email:req.body.email},{$set:{books:[]}},{new:true,multi:true});
    const orderData = {
        books:req.body.books,
        address:req.body.address[0],
        amount:req.body.amount,
        email:req.body.email
    }


    let orderRes = await Orders.create(orderData);
    // console.log(orderRes);
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