import express from "express";

const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");

const { createUserSchema } = require("../validators/userValidator");

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/", authMiddleware, getUsers);

router.get("/:id", authMiddleware, getUserById);

router.post(
  "/",
  authMiddleware,
  validateRequest(createUserSchema),
  createUser
);

router.put(
  "/:id",
  authMiddleware,
  validateRequest(createUserSchema),
  updateUser
);

router.delete("/:id", authMiddleware, deleteUser);

export default router;