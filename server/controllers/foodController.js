const Food = require("../models/Food");
const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();

        res.status(200).json(foods);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};
const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found",
            });
        }

        res.status(200).json(food);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const createFood = async (req, res) => {
    try {
        const food = await Food.create(req.body);

        res.status(201).json(food);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const updateFood = async (req, res) => {
    try {

        const food = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!food) {
            return res.status(404).json({
                message: "Food not found",
            });
        }

        res.status(200).json(food);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const deleteFood = async (req, res) => {
    try {

        const food = await Food.findByIdAndDelete(req.params.id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found",
            });
        }

        res.status(200).json({
            message: "Food deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

module.exports = {
    getAllFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood,
};

   