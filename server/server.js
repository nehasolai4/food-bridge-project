const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// routes
const foodRoutes = require("./routes/foodRoutes");
app.use("/api/food", foodRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// 🔥 ADD THIS
const requestRoutes = require("./routes/requestRoutes");
app.use("/api/request", requestRoutes);

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/foodapp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});