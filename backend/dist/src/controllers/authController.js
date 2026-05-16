"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const postgres_1 = require("../database/postgres");
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Email e senha são obrigatórios",
            });
            return;
        }
        const result = await postgres_1.pool.query("SELECT * FROM auth_users WHERE email = $1", [email]);
        const user = result.rows[0];
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Credenciais inválidas",
            });
            return;
        }
        const passwordMatch = bcryptjs_1.default.compareSync(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({
                success: false,
                message: "Credenciais inválidas",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        });
        res.json({
            success: true,
            message: "Login realizado com sucesso",
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
