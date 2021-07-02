const CartItem = require("../../team4/model/cart"); 
const asyncHandler = require("../middleware/async");
const Product = require("../../team4/model/books");
// var mongoose = require('mongoose');

// const fetchAllCartItems = asyncHandler(async (req, res, next) => {
//   res.json(res.advancedResults);
// });

const fetchAllCartItems = asyncHandler(async (req, res, next) => {
  // console.log(req.params.id);
  // var arr = data.books

  try {
    const cartItems = await CartItem.find({ email: req.params.email }).select("books ");

    console.log("cartItems", cartItems)
    // var Booksid = cartItems[0].books.map((element) => {

    //   console.log(element.quantity)
    //   return {bookid:element.bookid,quantity:element.}

    // })
    // console.log(Booksid);
    // console.log("cartItems", cartItems[0].books[0].bookid)
    // console.log("cartItems", cartItems[0].books[0].quantity)

    var prod = new Array();
    // var array = Booksid.map(async (element, i) => {
    //   var doc = await Product.findOne({ _id: element }).exec();
    //   console.log("doc", doc)
    //   prod[i] = doc
    for (let index = 0; index < cartItems[0].books.length; index++) {
      const element = cartItems[0].books[index].bookid;
      console.log("element",element)
      let doc = await Product.findOne({ _id: element })
      console.log("doc",doc)
      // let temp = doc._doc
      let arr = { ...doc._doc, quantity: cartItems[0].books[index].quantity }
      // Object.assign(doc, { quantity: 2 })
      // doc.quantity = cartItems[0].books[index].quantity
      console.log("quantity", doc.quantity)
      console.log("arr", arr)
      prod.push(arr)
      console.log("prod", prod)
    }


    // const populatecartItems = await CartItem.find({ email: req.params.email }).populate(Booksid);
    // var newarray=booksid.map()
    // console.log("prod", prod)
    // // console.log("array", array)
    // console.log("Booksid", Booksid)
    if (!cartItems) {
      return res.status(400).json({
        success: false
      });
    }
    res.status(201).json({
      success: true,
      data: prod
    });
  } catch (err) {
    next(err);
  }


})



// const addCartItems = asyncHandler(async (req, res, next) => {
//   try {
//     let bookData = await Product.findOne({ _id: req.body.bookid })
//     bookData.quantity = req.body.quantity

//     console.log("bookdata", bookData)
//     let cartItemRes = await CartItem.updateMany(
//       { _id: req.params.id },
//       {
//         $push: {
//           books: {
//             $each: [{ bookData }],

//           }
//         }
//       }
//     )
//     // let cartItemRes = await CartItem.findByIdAndUpdate({ _id: req.params.id }, req.body);
//     console.log(cartItemRes);
//     res.status(201).json({ success: true })
//   } catch (err) {
//     next(err);
//   }

// })

const delCartItems = asyncHandler(async (req, res, next) => {

  const b = req.body.bookid;
  const query = {
    email: req.params.email
  };
  let audioIndex = new Array();
  CartItem.findOne(query).then(item => {
    audioIndex = item.books.filter(item => item.bookid != b);
    item.books = audioIndex
    console.log("audio", audioIndex)
    item.save();
  }).catch(err => {
    console.log(err)
  });
  res.status(201).json({
    success: true,
    data: audioIndex
  });
});


// CartItem.update({ email: req.params.email },
//   { $pull: { books: { bookid: req.body.bookid } } },
//   { multi: true })
// console.log("bookid", req.body.bookid, req.params.email)
// .then((result) => {
//   res.status(201).json({
//     message: "product deleted",
//     result: result,
//   });
// })
// .catch((err) => {
//   res.status(500).json({
//     error: err,
//   });
// });


// db.survey.update(
//   { },
//   { $pull: { results: { score: 8 , item: "B" } } },
//   { multi: true }
// )

const patchCartItems = asyncHandler(async (req, res, next) => {
  const b = req.body.bookid;
  const query = {
    email: req.params.email
  };
  CartItem.findOne(query).then(item => {

    const audioIndex = item.books.map(item => item.bookid).indexOf(b);
    item.books[audioIndex].quantity = req.body.quantity;
    item.save();
    console.log("item", item)
    //sent respnse to client
  }).catch(err => {
    console.log(err)
  });
  res.status(201).json({
    success: true,
    data: []
  });

});

const patchAmount = asyncHandler(async (req, res, next) => {
  const filter = { email: req.params.email };
  const update = { amount: req.body.amount };


  let doc = await CartItem.findOneAndUpdate(filter, update, {
    returnOriginal: false
  });
  res.status(201).json({
    success: true,
    data: doc
  });

})



module.exports = {
  fetchAllCartItems,
  // addCartItems,
  delCartItems,
  patchCartItems,
  patchAmount
};
