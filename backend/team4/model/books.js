//This model is for temperory usage by team4 
const reviewSchema = require('../../team5/model/review')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BooksSchema = new Schema({
    title: {
        type: String,
        required: true
      },
      isbn: {
        type: Number,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      price:{
        type: Number
      },
      discount:{
        type: String
      },
      available:{
        type: Number,
        required: true
      },
      category:{
        type: String
     },
     publishDate : {
       type : Date,
       Default : Date.now 
     }
    //  review : [reviewSchema],
    //  rating: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    //  },
    //  numReviews: {
    //    type: Number,
    //    required: true,
    //    default: 0,
    //  }
});

BooksSchema.index({title: "text", author: "text"})

// 3. Model from Schema (object from schema)
const Books = mongoose.model('HomepageBookData', BooksSchema);

module.exports = Books;