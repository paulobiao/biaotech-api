import type { Request, Response, NextFunction } from "express";

import * as authService from "../services/authService";
import { successResponse, errorResponse } from "../utils/apiResponse";
import type { LoginDto } from "../dtos/auth.dto";

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

    const result = await authService.login({ email, password });

    if (!result) {
      errorResponse(res, 401, "Credenciais inválidas");
      return;
    }

    successResponse(res, 200, "Login realizado com sucesso", {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { refreshToken } = req.body as { refreshToken?: string };

    if (!refreshToken) {
      errorResponse(res, 400, "Refresh token é obrigatório");
      return;
    }

    const accessToken = authService.refreshAccessToken(refreshToken);

    if (!accessToken) {
      errorResponse(res, 401, "Refresh token inválido ou expirado");
      return;
    }

    successResponse(res, 200, "Token renovado com sucesso", {
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};