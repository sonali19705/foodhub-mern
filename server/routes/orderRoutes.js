const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    placeOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", authMiddleware, placeOrder);

router.get("/", authMiddleware, getMyOrders);


// Admin Routes

router.get(
    "/admin",
    authMiddleware,
    adminMiddleware,
    getAllOrders
);

router.put(
    "/admin/:id",
    authMiddleware,
    adminMiddleware,
    updateOrderStatus
);

router.get("/:id", authMiddleware, getOrderById);

module.exports = router;