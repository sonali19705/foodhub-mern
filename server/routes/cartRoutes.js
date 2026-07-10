const express = require("express");
const router = express.Router();

const { addToCart,
    getCart,
    updateCart,
    removeCart,
    clearCart, } = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.put("/:foodId", authMiddleware, updateCart);
router.delete("/:foodId", authMiddleware, removeCart);
router.delete("/", authMiddleware, clearCart);
module.exports = router;