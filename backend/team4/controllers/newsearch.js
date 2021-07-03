const Books = require('../model/books')
const asyncHandler = require('../middleware/asyncHandler.js');

const insertdata = asyncHandler(async(req,res,next) => {
    let postNewbook = await Books.create(req.body);
    console.log(postNewbook);
    res.status(201).json({success: "Added Sucessfully"})
})

const findAlldata = asyncHandler(async(req, res)=>{
    res.status(200).json(res.advancedResults);
})

const findDataBasedOnSearchItem = async (req,res,next)=>{
    let searchData=await Books.find({ $text : { $search : req.params.searchitem, $caseSensitive: false } });
    if(searchData.length !=0){
        res.json(searchData);
        console.log(searchData);}
    else next({message:"no record found"});
}

 const findDataBasedOnBookid = async (req,res,next)=>{
     let searchData=await Books.find({_id: req.params.id});
     if(searchData.length !=0){
         res.json(searchData);
         console.log(searchData);}
     else next({message:"no record found"});
 }

 

module.exports = {insertdata,findAlldata,findDataBasedOnSearchItem, findDataBasedOnBookid};


// const findDataBasedOnBookid = async (req,res,next)=>{
//     let searchData=await Books.find({id_: req.params.id_});
//     if(searchData.length !=0){
//         res.json(searchData);
//         console.log(searchData);}
//     else next({message:"no record found"});
// }

// module.exports = {insertdata,findAlldata,findDataBasedOnSearchItem};


// const findDataBasedOnAuthor = async (req,res,next)=>{
//     let searchData=await Books.find({author : req.params.author});
//     if(searchData.length !=0){
//         res.json(searchData);
//         console.log(searchData);}
//     else next({message:"no record found"});
// }

// const findDataBasedOnTitle = async (req,res,next)=>{
//     let searchData=await Books.find({title : req.params.title});
//     if(searchData.length !=0){
//         res.json(searchData);
//         console.log(searchData);}
//     else next({message:"no record found"});
// }

// const findDataBasedOnLanguage = async (req,res,next)=>{
//     let searchData=await Books.find({language : req.params.language});
//     if(searchData.length !=0){
//         res.json(searchData);
//         console.log(searchData);}
//     else next({message:"no record found"});
// }
