const mongoose = require('mongoose');
const User = require('./User');

const productSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    image : {
        type : String,
    },
    category : {
        type : String,
    },
    stock : {
        type : Number,
        default : 0
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
});

const Product = mongoose.model("Product",productSchema);
module.exports = Product;