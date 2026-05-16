const { pool } = require("../database/postgres");

exports.healthCheck = async (req, res) => {
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
    res.status(500).json({
      success: false,
      status: "error",
      service: "biaotech-api",
      environment: process.env.NODE_ENV,
      database: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};