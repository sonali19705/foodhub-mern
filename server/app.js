const cors = require("cors");
const express = require("express");
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

module.exports = app;