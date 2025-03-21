const express = require("express");
const verifytoken = require("../middleware/authMiddleware");
const router = express.Router();
const {
  register,
  login,
  logout,
  authCheck,
} = require("../controller/authConotroller");
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/authCheck", verifytoken, authCheck);
module.exports = router;
