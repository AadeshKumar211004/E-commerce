const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { addProduct, getProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');


/*---------Public Routes------*/ 
router.get("/",getProduct);
router.get("/:id",getSingleProduct);

/*--------Admin Routes---------*/ 
router.post('/', protect, admin, addProduct );
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;