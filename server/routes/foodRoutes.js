const express = require("express");
const router = express.Router();

const {
  addFood,
  getFood,
  deleteFood,
  getDonorFood
} = require("../controllers/foodController");

const upload = require("../middleware/upload");

router.post("/add", upload.single("image"), addFood);
router.get("/", getFood);
router.get("/donor/:id", getDonorFood);

router.delete("/:id", deleteFood);

module.exports = router;