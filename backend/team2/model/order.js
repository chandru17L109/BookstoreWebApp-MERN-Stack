const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const AddressSchema = require('./address');
const OrderSchema = new Schema({

    email: {
        type: String,
        unique: [true, 'Provide a Unique Email'],
        trim: true,
        required: [true, 'Please provide a Email'],
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please provide a valid Email Address']
    },
    amount: {
        type: Number
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["new", "packed", "shipped", "completed", "cancelled", "delayed"],
        default: "new"
    },
    books: [
        {
            quantity:
            {
                type: Number
            },
            isbn:
            {
                type: Number
            }
        }
    ],
    // address: {
    //     type: AddressSchema,
    //     // required: [true]
    //     required: [true, 'Please provide a Address']
    // },
    paymentStatus: {
        type: Boolean,
        default: false
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;

