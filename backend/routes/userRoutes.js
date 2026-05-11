
const express = require("express");
const router = express.Router();
const protected = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const User = require("../models/User");

router.get("/profile", protected, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});

router.get("/admin", protected,admin, (req, res) => {
  res.json({
        message : "Welcome Admin...",
    });
});

module.exports = router;    