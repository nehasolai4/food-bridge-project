const Food = require("../models/Food");

exports.addFood = async (req, res) => {
  try {
    // 🔥 CREATE DATA OBJECT
    const foodData = {
      ...req.body,
      image: req.file ? req.file.filename : ""
    };

    // ✅ FIX LOCATION HERE (IMPORTANT LINE)
    if (req.body.location) {
      foodData.location = JSON.parse(req.body.location);
    }

    // SAVE
    const food = new Food(foodData);
    await food.save();

    res.status(201).json(food);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};