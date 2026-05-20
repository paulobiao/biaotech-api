import type { Request, Response, NextFunction } from "express";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { pool } from "../database/postgres";
import { successResponse, errorResponse } from "../utils/apiResponse";
import type { LoginDto } from "../dtos/auth.dto";
import type { AuthUser } from "../types/user";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body as LoginDto;

    if (!email || !password) {
      errorResponse(res, 400, "Email e senha são obrigatórios");
      return;
    }

    const result = await pool.query<AuthUser>(
      "SELECT * FROM auth_users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      errorResponse(res, 401, "Credenciais inválidas");
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      errorResponse(res, 401, "Credenciais inválidas");
      return;
    }

    const token = jwt.sign(
      {
      id: user.id,
      email: user.email,
      role: user.role,
    },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      } as SignOptions
    );

    successResponse(res, 200, "Login realizado com sucesso", { token });
  } catch (error) {
    next(error);
  }
};