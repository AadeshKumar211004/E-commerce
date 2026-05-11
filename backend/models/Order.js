const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    orderItems : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
            },
            name :  String,
            price : Number,
            quantity : Number,
        },
    ],
    shippingAddress : {
        address : String,
        city : String,
        postalCode : String,
        country : String,
    },
    phone :{
        type: String,
        required : true,
    },
    totalPrice : {
        type : Number,
        required : true,
    },
    isPaid : {
        type : Boolean,
        default : false,
    },
    status : {
        type : String,
        enum : ["pending", "confirmed", "shipped", "delivered"],
        default : "pending",
    },
    paymentMethod: {
        type: String,
        default: "COD",
    }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order",orderSchema);
module.exports = Order; 