const express = require("express");
const router = express.Router();

const {
  addFood,
  getFood,
  deleteFood

} = require("../controllers/foodController");

const upload = require("../middleware/upload");

router.post("/add", upload.single("image"), addFood);

// donor uploads food
router.post("/add", addFood);

// acceptor fetches food
router.get("/", getFood);

router.delete("/:id", deleteFood);

module.exports = router;
