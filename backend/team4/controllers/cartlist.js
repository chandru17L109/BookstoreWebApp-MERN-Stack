const CartListBooks = require('../model/cart')
const asyncHandler = require('../middleware/asyncHandler.js');

const insertdata = asyncHandler(async(req,res,next)=>{
    let searchData=await CartListBooks.find({email : req.body.email});
    if(searchData.length === 0){
        var book={quantity : req.body.quantity, bookid : req.body.bookid};
        let postNewbook = await CartListBooks.create({email:req.body.email,books:[book]});
        console.log(postNewbook);
        res.status(201).json({success: "Added Sucessfully"})
    }else{
        var book={quantity : req.body.quantity, bookid : req.body.bookid};
        let book_id = await CartListBooks.findOneAndUpdate({email:req.body.email},{$addToSet:{books:book}},{
            new: true,
            runValidators: true
        })
       res.status(201).json({success: "Added Sucessfully"})
    }
})

const findallcart = asyncHandler(async(req,res,next)=>{
    let searchData=await CartListBooks.find({});
    if(searchData.length !=0){
        res.json(searchData);
        console.log(searchData);}
})

const findonecart = asyncHandler(async(req,res,next)=>{
    let searchData=await CartListBooks.findOne({email : req.params.email}).populate('books.bookid');;
    if(searchData.length !=0){
        res.json(searchData);
        console.log(searchData);}
    else next({message:"no record found"});
    //res.status(200).json(res.advancedResults);
})

module.exports = {insertdata,findallcart,findonecart};


// var arr=booksitem.map((element)=>{return (Products.find({_id:element}))})