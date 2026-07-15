const Food = require("../models/Food");
const Order = require("../models/Order");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {

    try {

        const totalFoods = await Food.countDocuments();

        const totalOrders = await Order.countDocuments();

        const totalCustomers = await User.countDocuments({
            role: "customer",
        });

        const totalDeliveryPartners = await User.countDocuments({
            role: "deliveryPartner",
        });

        res.status(200).json({
            success: true,
            stats: {
                totalFoods,
                totalOrders,
                totalCustomers,
                totalDeliveryPartners,
            },
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
    getDashboardStats,
};