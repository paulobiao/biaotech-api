import type { Request, Response } from "express";

import { pool } from "../database/postgres";

export const healthCheck = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await pool.query("SELECT 1");

    res.json({
      success: true,
      status: "ok",
      service: "biaotech-api",
      environment: process.env.NODE_ENV,
      database: "connected",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    res.status(500).json({
      success: false,
      status: "error",
      service: "biaotech-api",
      environment: process.env.NODE_ENV,
      database: "disconnected",
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
};