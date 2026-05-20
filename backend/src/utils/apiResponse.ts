import type { Response } from "express";

interface ErrorDetails {
  field?: string;
  message: string;
}

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: Record<string, unknown> = {}
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors: ErrorDetails[] | null = null
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};