const Cart = require("../models/Cart");
const Product = require("../models/Product");

/*-------Add to Cart-------- */

const addToCart = async(req, res) =>{
    try {

        const { productId, quantity } = req.body;

        const product = await Product.findById( productId );
        
        if(!product){
            return res.status(404).json({ message : "Product not found. "});
        }
        
        let cart = await Cart.findOne({ user : req.user._id});
        
    // ager user ka pass cart nahi h toh use cart create krega  
        if(!cart){
            cart = new Cart({
                user : req.user._id,
                items : [],
            });
        }
        
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

        if(itemIndex > -1){
            cart.items[itemIndex].quantity += quantity;
        }else {
            cart.items.push({
                product : product._id,
                name : product.name,
                price : product.price,
                image : product.image,
                quantity,
            });
        }
        
        console.log(cart)
        await cart.save();
        res.json(cart);

    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};

/*------------------Get Cart User -------------------- */

const getCart = async(req, res) =>{
    try {
        
        const cart = await Cart.findOne({ user : req.user._id}).populate("items.product","name price");

        res.json(cart);

    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};

/*-------------Update cart Quantity ----------*/ 

const updateCartItem = async(req, res) =>{
    try {
        
        const { quantity } = req.body;

        const cart = await  Cart.findOne({ user : req.user._id });

        const item = cart.items.find( ( item ) => item.product.toString() === req.params.productId );
        if(!item){
            return res.status(404).json({ message : "Item not found. "});
        }

        item.quantity = quantity;
        await cart.save();

        res.json(cart);

    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};

/*----------------------Remove Item User -------------------------*/ 

const removeCartItem = async(req, res) =>{
    try {
        
        const cart = await Cart.findOne({ user : req.user._id });
        
        cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId );

        await  cart.save();
        res.json(cart);

    } catch (error) {
        res.status(500).json({ message : error.message });
    }
}

module.exports = { addToCart, getCart, updateCartItem, removeCartItem };
