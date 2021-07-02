//import mongoose from 'mongoose'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
   {
     
     rating: { 
        type: Number,
        required: true,
        min : 1,
        max : 5,
      },
     comment: {
        type: String,
        required: true
      },
      avgRating :{
         type:Number,
      },
     reviewDate : {
       type : Date,
       Default : Date.now
     },
     user: {
         type: String,
         required: true,
         unique:true
      },
      book: {
         type : mongoose.Schema.Types.ObjectId,
          ref : 'HomepageBookData',
          required: true,
       }
    }
 )

 const Reviews = mongoose.model('Review', reviewSchema);

 module.exports = Reviews
