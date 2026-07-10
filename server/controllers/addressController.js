const Address = require("../models/Address");
const mongoose = require("mongoose");
const addAddress = async (req, res) => {
    try {
        const user = req.user.id;

        const {
            fullName,
            mobile,
            house,
            area,
            city,
            state,
            pincode,
        } = req.body;

        if (
            !fullName ||
            !mobile ||
            !house ||
            !area ||
            !city ||
            !state ||
            !pincode
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }
        if (mobile.length !== 10) {
            return res.status(400).json({
                success: false,
                message: "Mobile number must be 10 digits",
            });
        }

        if (pincode.length !== 6) {
            return res.status(400).json({
                success: false,
                message: "Pincode must be 6 digits",
            });
        }
        const addressCount = await Address.countDocuments({ user });
        const address = await Address.create({
            user,
            fullName,
            mobile,
            house,
            area,
            city,
            state,
            pincode,
            isDefault: addressCount === 0,
        });

        res.status(201).json({
            success: true,
            message: "Address added successfully",
            address,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const getAddresses = async (req, res) => {
    try {
        const user = req.user.id;

        const addresses = await Address.find({ user });

        res.status(200).json({
            success: true,
            addresses,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
const updateAddress = async (req, res) => {
    try {
        const user = req.user.id;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Address ID",
            });
        }

        const address = await Address.findOne({
            _id: id,
            user,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        const {
            fullName,
            mobile,
            house,
            area,
            city,
            state,
            pincode,
        } = req.body;
        if (
            !fullName ||
            !mobile ||
            !house ||
            !area ||
            !city ||
            !state ||
            !pincode
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }
        if (mobile.length !== 10) {
            return res.status(400).json({
                success: false,
                message: "Mobile number must be 10 digits",
            });
        }

        if (pincode.length !== 6) {
            return res.status(400).json({
                success: false,
                message: "Pincode must be 6 digits",
            });
        }
        address.fullName = fullName;
        address.mobile = mobile;
        address.house = house;
        address.area = area;
        address.city = city;
        address.state = state;
        address.pincode = pincode;

        await address.save();

        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
const deleteAddress = async (req, res) => {
    try {
        const user = req.user.id;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Address ID",
            });
        }

        const address = await Address.findOneAndDelete({
            _id: id,
            user,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
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
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
};