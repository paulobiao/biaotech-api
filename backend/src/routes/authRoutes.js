const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", login);

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;