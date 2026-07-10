const Cart = require("../models/Cart");
const Food = require("../models/Food");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
    try {
        const { food, quantity = 1 } = req.body;
        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1",
            });
        }

        const user = req.user.id;
        if (!mongoose.Types.ObjectId.isValid(food)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Food ID",
            });
        }
        const foodItem = await Food.findById(food);

        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: "Food not available",
            });
        }

        let cart = await Cart.findOne({ user });

        if (!cart) {
            cart = new Cart({
                user,
                items: [
                    {
                        food,
                        quantity,
                    },
                ],
            });
        } else {
            const existingItem = cart.items.find(
                (item) => item.food.toString() === food
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({
                    food,
                    quantity,
                });
            }
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item added to cart",
            cart,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


const getCart = async (req, res) => {
    try {
        const user = req.user.id;

        const cart = await Cart.findOne({ user }).populate("items.food");

        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: {
                    items: [],
                },
            });
        }

        res.status(200).json({
            success: true,
            cart,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const updateCart = async (req, res) => {
    try {
        const user = req.user.id;
        const { foodId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1",
            });
        }
        if (!mongoose.Types.ObjectId.isValid(foodId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Food ID",
            });
        }

        const cart = await Cart.findOne({ user });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const item = cart.items.find(
            (item) => item.food.toString() === foodId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Food item not found in cart",
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const removeCart = async (req, res) => {
    try {
        const user = req.user.id;
        const { foodId } = req.params;

        const cart = await Cart.findOne({ user });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        cart.items = cart.items.filter(
            (item) => item.food.toString() !== foodId
        );

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            cart,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const clearCart = async (req, res) => {
    try {
        const user = req.user.id;

        const cart = await Cart.findOne({ user });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        cart.items = [];

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
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
    addToCart,
    getCart,
    updateCart,
    removeCart,
    clearCart,
};