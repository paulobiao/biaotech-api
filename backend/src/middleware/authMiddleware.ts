import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import type { JwtPayload } from "../types/auth";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: "Token não informado",
    });

    return;
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.status(401).json({
      success: false,
      message: "Token mal formatado",
    });

    return;
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Token inválido ou expirado",
    });
  }
};

export default authMiddleware;