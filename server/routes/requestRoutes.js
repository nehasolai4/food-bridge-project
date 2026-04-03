const express = require("express");
const router = express.Router();

const {
  createRequest,
  getDonorRequests,
  getRequests,
  updateRequestStatus
} = require("../controllers/requestController");

router.post("/create", createRequest);
router.get("/", getRequests);
router.get("/donor/:id", getDonorRequests);
router.put("/:id", updateRequestStatus); // 🔥 NEW

module.exports = router;