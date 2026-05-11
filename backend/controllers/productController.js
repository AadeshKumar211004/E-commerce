const Product = require("../models/Product");

/* -----------------Add Product Admin only ------------*/

const addProduct = async(req,res)=>{
    try {
        
        const {name, title, price, description, image, category,stock} = req.body;

        const product = await Product.create({
            name,
            title,
            price,
            description,
            image,
            category,
            stock,
            user : req.user._id,
        });
        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/* ----------------- View all Product User ------------*/

const getProduct = async(req, res) =>{
    try {
        const products = await Product.find().populate("user","name email");
        res.json(products);
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/* -----------------view single Product ----------------*/

const getSingleProduct = async(req, res ) =>{
    try {
        
        const product = await Product.findById(req.params.id).populate("user","name email");

        if(!product){
            return res.status(404).json( { message : "Product not found."} );
        }
        res.json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/*---------------Update Product Admin Only ------------*/ 
const updateProduct = async(req,res)=>{
    try {
        
        const {name, title, price, description, image, category, stock} = req.body;

        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({messaage:"Product not found."});
        }

        product.name = name || product.name;
        product.title = title || product.title;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.category = category || product.category;
        product.stock = stock || product.stock;

        const productUpdated = await product.save();

        res.json(productUpdated);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/*------------------Delete Product Admin Only--------*/ 

const deleteProduct = async(req, res) =>{
    try {
        
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({ message: " Product not found."})
        }

        await product.deleteOne();
        res.json({ message : "Product deleted successfully. "});

    } catch (error) {
        return res.status(500).json({ message : error.messaage });
    }
}

module.exports =  {getProduct, getSingleProduct, addProduct, updateProduct, deleteProduct };