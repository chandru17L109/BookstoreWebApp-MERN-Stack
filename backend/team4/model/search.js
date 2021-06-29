//This model is for temperory usage by team4 

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
      description: {
        type: String
      },
      price:{
        type: Number
      },
      publishedDate: {
        type: Date
      },
      publisher: {
        type: String
      },
      discount:{
        type: String
      },
      price:{
        type: String
      },
      available:{
        type: Number,
        required: true
      },
      category:{
        type: String
     }
});

BooksSchema.index({title: "text", author: "text"})

// 3. Model from Schema (object from schema)
const Books = mongoose.model('HomepageBookData', BooksSchema);

module.exports = Books;