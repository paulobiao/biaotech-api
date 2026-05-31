import express from "express";

import { login, refreshToken } from "../controllers/authController";

const authMiddlewareModule = require("../middleware/authMiddleware");
const authMiddleware = authMiddlewareModule.default || authMiddlewareModule;

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and generate JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@biaotech.dev
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);
router.post("/refresh", refreshToken);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get authenticated user data
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user data
 *       401:
 *         description: Missing, invalid, or expired token
 */
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Usuário autenticado",
    user: req.user,
  });
});

export default router;