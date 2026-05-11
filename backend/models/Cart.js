const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    items : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
            },
            name : String,
            price : Number,
            image : String,
            quantity : Number,
            
        },
    ],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;