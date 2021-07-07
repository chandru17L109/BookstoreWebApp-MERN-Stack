const asyncHandler = require('express-async-handler')
const Wishlist = require('../../team4/model/wishlist.js')
const Books = require('../../team4/model/books.js')

const getMyWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.find({ email: req.user.email})
  const books=wishlist[0].books
  let bookarray=[]
  for(i in books){
    bookarray[i]=await Books.find({_id:books[i]}) 
  }
  //console.log(bookarray)
  res.json(bookarray)
});


module.exports = {getMyWishlist}