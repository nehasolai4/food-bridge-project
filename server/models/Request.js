const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food"
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  acceptorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    default: "Pending"
  },
  requestedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Request", requestSchema);