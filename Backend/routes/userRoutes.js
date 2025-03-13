const express = require("express");
const router = express.Router();

const { favratios } = require("../controller/movieController");
const verifytoken = require("../middleware/authMiddleware");

router.get("/fav", verifytoken, favratios);

module.exports = router;
