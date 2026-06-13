import express from "express";

const authMiddlewareModule = require("../middleware/authMiddleware");
const authMiddleware = authMiddlewareModule.default || authMiddlewareModule;

const authorizeRolesModule = require("../middleware/authorizeRoles");
const authorizeRoles = authorizeRolesModule.default || authorizeRolesModule;

import validateRequest from "../middleware/validateRequest";

const { createUserSchema } = require("../validators/userValidator");

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List users with pagination and search
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of users per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: Paulo
 *         description: Search users by name
 *     responses:
 *       200:
 *         description: Users listed successfully
 *       401:
 *         description: Missing or invalid token
 */
router.get("/", authMiddleware, getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found successfully
 *       401:
 *         description: Missing or invalid token
 *       404:
 *         description: User not found
 */
router.get("/:id", authMiddleware, getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Paulo Test
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Missing or invalid token
 */
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  validateRequest(createUserSchema),
  createUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated User
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Missing or invalid token
 *       404:
 *         description: User not found
 */
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  validateRequest(createUserSchema),
  updateUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Requires admin role.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: Access denied - admin role required
 *       404:
 *         description: User not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteUser
);

export default router;