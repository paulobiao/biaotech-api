const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validateUser = require("../middleware/validateUser");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.post("/", authMiddleware, validateUser, createUser);
router.put("/:id", authMiddleware, validateUser, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;