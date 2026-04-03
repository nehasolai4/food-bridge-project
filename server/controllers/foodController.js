const Food = require("../models/Food");

// ADD FOOD
exports.addFood = async (req, res) => {
  try {
    const foodData = {
      ...req.body,
      image: req.file ? req.file.filename : "",
      donorId: req.body.donorId
    };

    if (req.body.location) {
      foodData.location = JSON.parse(req.body.location);
    }

    const food = new Food(foodData);
    await food.save();

    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET FOOD
exports.getFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE FOOD
exports.deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Food deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDonorFood = async (req, res) => {
  try {
    const Food = require("../models/Food");

    const foods = await Food.find({ donorId: req.params.id });

    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};