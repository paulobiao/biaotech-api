import type { Response } from "express";

export function successResponse(
  res: Response,
  statusCode: number,
  message: string,
  data?: Record<string, unknown>
): Response;

export function errorResponse(
  res: Response,
  statusCode: number,
  message: string,
  errors?: unknown
): Response;