const express = require("express");
const foodRoutes = require("./routes/foodRoutes");

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to FoodHub API 🚀");
});

// Middleware
app.use(express.json());

app.use("/api/foods", foodRoutes);

module.exports = app;