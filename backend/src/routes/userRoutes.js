const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");

const { createUserSchema } = require("../validators/userValidator");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.post("/", authMiddleware, validateRequest(createUserSchema), createUser);
router.put("/:id", authMiddleware, validateRequest(createUserSchema), updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;