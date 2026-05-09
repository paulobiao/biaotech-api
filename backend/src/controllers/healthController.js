exports.healthCheck = (req, res) => {
  res.json({
    success: true,
    status: "ok",
    service: "biaotech-api",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
};