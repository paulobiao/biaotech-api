import express from "express";

const authMiddlewareModule = require("../middleware/authMiddleware");
const authMiddleware = authMiddlewareModule.default || authMiddlewareModule;
const authorizeRolesModule = require("../middleware/authorizeRoles");
const authorizeRoles =
  authorizeRolesModule.default || authorizeRolesModule;
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

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteUser
);

export default router;