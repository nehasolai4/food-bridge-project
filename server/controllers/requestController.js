const Request = require("../models/Request");
const Food = require("../models/Food");

exports.createRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();

    // 🔥 update food status
    await Food.findByIdAndUpdate(req.body.foodId, {
      status: "Requested"
    });

    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};