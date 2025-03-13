const express = require("express");
const verifytoken = require("../middleware/authMiddleware");
const router = express.Router();
const { register, login, logout } = require("../controller/authConotroller");
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
module.exports = router;
