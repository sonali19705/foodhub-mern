let foods = [
    {
        id: 1,
        name: "Pizza",
        price: 299,
    },
    {
        id: 2,
        name: "Burger",
        price: 199,
    },
    {
        id: 3,
        name: "Pasta",
        price: 249,
    },
];
const getAllFoods = (req, res) => {
    res.json(foods);
};
const getFoodById = (req, res) => {

    const id = Number(req.params.id);

    const food = foods.find(food => food.id === id);

    if (!food) {
        return res.status(404).json({
            message: "Food not found",
        });
    }

    res.json(food);

};

const createFood = (req, res) => {

    const { name, price } = req.body;

    const newFood = {
        id: foods.length + 1,
        name,
        price,
    };

    foods.push(newFood);

    res.status(201).json(newFood);

};

const updateFood = (req, res) => {

    const id = Number(req.params.id);

    const food = foods.find(food => food.id === id);

    if (!food) {
        return res.status(404).json({
            message: "Food not found",
        });
    }

    const { name, price } = req.body;

    food.name = name;
    food.price = price;

    res.json(food);

};
const deleteFood = (req, res) => {

    const id = Number(req.params.id);

    const index = foods.findIndex(food => food.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Food not found",
        });
    }

    foods.splice(index, 1);

    res.json({
        message: "Food deleted successfully",
    });

};


module.exports = {
    getAllFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood,
};