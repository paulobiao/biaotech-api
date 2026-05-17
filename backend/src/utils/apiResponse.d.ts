import type { Response } from "express";

export function successResponse(
  _res: Response,
  _statusCode: number,
  _message: string,
  _data?: Record<string, unknown>
): Response;

export function errorResponse(
  _res: Response,
  _statusCode: number,
  _message: string,
  _errors?: unknown
): Response;