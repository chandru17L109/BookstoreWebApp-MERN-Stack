//This model is for temperory usage by team4 
// const reviewSchema = require('../../team5/model/review')
// const AuthorSchema = require('./authors');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BooksSchema = new Schema({
    title: {
        type: String,
        unique: false,
        lowercase: true,
        trim: true,
        required: [true, 'Please provide a title'],
        match: [/[a-zA-Z]{2,}/, 'Please provide a valid title'],
        index: true,
        unique: true
    },
    category: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Please provide a Category'],
        match: [/[a-zA-Z]{2,}/, 'Please provide a valid Category'],
        enum: ["horror", "comedy", "adeventure", "fiction", "ancient", "sciencefiction", "thriller", "spritual", "classic" ],
        index: true
    },
    isbn: {
        type: Number,
        required: [true, 'Please provide a ISBN'],
    
    },
    price: {
        type: Number,
        required: [true, 'Please provide a Price'],
    },
    publishDate: {
        type: Date,
        required: [true, 'Please provide a Publish Date'],
    },

    authors: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Please provide a Author'],
        match: [/[a-zA-Z]{4,}/, 'Please provide a valid Author'],
        index: true
    },

    discount: {
        type: Number,
        default: 0
    },

    available: {
        type: Number,
        default:0
    },
      image : {
        type : String
      }
  });


BooksSchema.index({title: "text",category: 'text', authors: "text"})

// 3. Model from Schema (object from schema)
const Books = mongoose.model('HomepageBookData', BooksSchema);

module.exports = Books;