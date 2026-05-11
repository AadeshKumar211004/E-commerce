const Cart = require("../models/Cart");
const Order = require("../models/Order");
const mongoose =require('mongoose');
const User = require("../models/User");

/*---------Order Place User------------*/ 

const placeOrder = async(req, res) =>{
    try {

        const { orderItems, shippingAddress, totalPrice} = req.body;

        if(!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message : "No items in Order"});
        }
        
        const order = await Order.create({
            user : req.user._id,
            orderItems,
            shippingAddress,
            totalPrice,
        });

        res.status(201).json(order);

    } catch (error) {
        return res.status(500).json({ message : error.message});
    }
};

/*----------Get My Order User ----------*/

const getMyOrder = async(req,res) =>{
    try {
        
        const orders = await Order.find({user : req.user._id}).sort({ createdAt : -1 });

        res.json(orders);

    } catch (error) {
        return res.status(500).json({ message :  error.message });
    }
};

/*---------- View All Orders Admin only------*/ 

const getAllOrders = async(req, res) =>{
    try {
        
        const orders = await Order.find().populate("user", "name phone email ");

        res.json(orders);

    } catch (error) {
        return res.status(500).json({ message :  error.message });
    }
};

/*-------------Update Order Status Admin Only ----------*/ 

const updateOrderStatus = async(req, res) =>{
    try {
        
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if(!order){
            return res.status(404).json({ message :" Order not found. "});
        }

        order.status = status;

        const updateOrder = await order.save();
        res.json(updateOrder);

    } catch (error) {
        return res.status(500).json({ message :  error.message });
    }
};

/*-------convert cart items to order ---------*/ 

const checkOut = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // 🔥 USER FETCH (IMPORTANT)
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      orderItems: cart.items,
      shippingAddress: req.body.shippingAddress,
      phone: user.phone,   // 🔥 NOW WORKING
      totalPrice,
      paymentMethod: "COD",
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { placeOrder, getMyOrder, getAllOrders, updateOrderStatus, checkOut };