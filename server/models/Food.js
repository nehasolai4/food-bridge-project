const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  image: String,
  title: String,
  quantity: String,

  location: {
    city: String,
    address: String,
    pincode: String
  },

  expiry: String,

  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    default: "Available"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Food", foodSchema);