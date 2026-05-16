const { ZodError } = require("zod");

const errorMiddleware = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Erro de validação",
      errors: err.issues.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      })),
    });
  }

  console.error("Unexpected error:", err);

  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
  });
};

module.exports = errorMiddleware;