import type { Request, Response } from "express";

export const getMessage = (
  req: Request,
  res: Response
): void => {
  res.json({
    message: "API profissional BiaoTech 🚀",
  });
};