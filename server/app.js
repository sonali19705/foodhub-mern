const cors = require("cors");
const express = require("express");
const foodRoutes = require("./routes/foodRoutes");

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

app.use("/api/foods", foodRoutes);

module.exports = app;