import crypto from "crypto";
import type { Request, Response, NextFunction } from "express";

const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requestId = crypto.randomUUID();

  res.setHeader("X-Request-Id", requestId);

  next();
};

export default requestIdMiddleware;