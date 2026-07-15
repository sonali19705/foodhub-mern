const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Address = require("../models/Address");
const mongoose = require("mongoose");
const placeOrder = async (req, res) => {
    try {

        const user = req.user.id;

        const { address } = req.body;

        if (!mongoose.Types.ObjectId.isValid(address)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Address ID",
            });

        }

        const selectedAddress = await Address.findOne({
            _id: address,
            user,
        });

        if (!selectedAddress) {

            return res.status(404).json({
                success: false,
                message: "Address not found",
            });

        }

        const cart = await Cart.findOne({ user })
            .populate("items.food");

        if (!cart || cart.items.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });

        }

        let totalAmount = 0;

        cart.items.forEach((item) => {

            totalAmount +=
                item.food.price * item.quantity;

        });

        const order = await Order.create({

            user,

            items: cart.items.map((item) => ({
                food: item.food._id,
                quantity: item.quantity,
            })),

            address,

            totalAmount,

        });

        cart.items = [];

        await cart.save();

        res.status(201).json({

            success: true,

            message: "Order placed successfully",

            order,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};
const getMyOrders = async (req, res) => {

    try {

        const user = req.user.id;

        const orders = await Order.find({ user })
            .populate("items.food")
            .populate("address")
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            orders,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};
const getOrderById = async (req, res) => {

    try {

        const user = req.user.id;

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid Order ID",

            });

        }

        const order = await Order.findOne({

            _id: id,
            user,

        })
            .populate("items.food")
            .populate("address");

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found",

            });

        }

        res.status(200).json({

            success: true,

            order,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};

const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.food")
            .populate("address")
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            orders,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};
const updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { orderStatus } = req.body;

        const order = await Order.findById(id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found",

            });

        }

        order.orderStatus = orderStatus;

        await order.save();

        res.status(200).json({

            success: true,

            message: "Order status updated successfully",

            order,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};
module.exports = {
    placeOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
};