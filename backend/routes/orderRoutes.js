const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { placeOrder, getMyOrder, getAllOrders, updateOrderStatus, checkOut } = require('../controllers/orderController');
const admin = require('../middleware/adminMiddleware');

/*---------User Routes--------*/ 
router.post("/", protect, placeOrder);
router.get("/myorder", protect, getMyOrder);
router.post("/checkout", protect, checkOut );

/*---------------Admin Only -------*/ 
router.get("/", protect, admin, getAllOrders);
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;    