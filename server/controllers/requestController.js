const Request = require("../models/Request");
const Food = require("../models/Food");

// 🔥 CREATE REQUEST
exports.createRequest = async (req, res) => {
  try {
    const { foodId, acceptorId } = req.body;

    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const request = new Request({
      foodId,
      donorId: food.donorId,
      acceptorId
    });

    await request.save();

    res.json({ message: "Request sent successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 GET REQUESTS FOR DONOR
exports.getDonorRequests = async (req, res) => {
  try {
    const requests = await Request.find({ donorId: req.params.id })
      .populate("foodId")
      .populate("acceptorId");

    res.json(requests);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(request);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};