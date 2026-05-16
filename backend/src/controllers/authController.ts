import type { Request, Response, NextFunction } from "express";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../database/postgres";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios",
      });
      return;
    }

    const result = await pool.query(
      "SELECT * FROM auth_users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      } as SignOptions
    );

    res.json({
      success: true,
      message: "Login realizado com sucesso",
      token,
    });
  } catch (error) {
    next(error);
  }
};