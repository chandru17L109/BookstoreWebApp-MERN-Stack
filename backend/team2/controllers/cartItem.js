const CartItem = require("../../team4/model/cart");
const asyncHandler = require("../middleware/async");
const Product = require("../../team4/model/books");


const fetchAllCartItems = asyncHandler(async (req, res, next) => {


  try {
    const cartItems = await CartItem.find({ email: req.params.email }).select("books ");

    console.log("cartItems", cartItems)

    var prod = new Array();
    for (let index = 0; index < cartItems[0].books.length; index++) {
      const element = cartItems[0].books[index].bookid;
      console.log("element", element)
      let doc = await Product.findOne({ _id: element })
      console.log("doc", doc)
      let arr = { ...doc._doc, quantity: cartItems[0].books[index].quantity }
      console.log("quantity", doc.quantity)
      console.log("arr", arr)
      prod.push(arr)
      console.log("prod", prod)
    }
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



const patchCartItems = asyncHandler(async (req, res, next) => {
  const b = req.body.bookid;
  const query = {
    email: req.params.email,
  };
  var bool = false;
  if (req.body.QuantityChange === "add") {
    bool = true;
  }
  console.log("max", req.body.max)
  CartItem.findOne(query)

    .then((item) => {
      const audioIndex = item.books.map((item) => item.bookid).indexOf(b);
      if (bool) {
        if (item.books[audioIndex].quantity < req.body.max) {
          item.books[audioIndex].quantity += 1;
        }
      } else {
        if (item.books[audioIndex].quantity > 1) {
          item.books[audioIndex].quantity -= 1;
        }
      }

      item.save();
      console.log("item", item);
      //sent respnse to client
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).json({
    success: true,
    data: [],
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
  delCartItems,
  patchCartItems,
  patchAmount
};
