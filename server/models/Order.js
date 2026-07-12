const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],

        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Preparing",
                "Out for Delivery",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },

        paymentMethod: {
            type: String,
            enum: [
                "Cash on Delivery",
                "Online",
            ],
            default: "Cash on Delivery",
        },

        paymentStatus: {
            type: String,
            enum: [
                "Pending",
                "Paid",
                "Failed",
            ],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);