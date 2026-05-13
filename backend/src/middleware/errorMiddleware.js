const { ZodError } = require("zod");

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

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

  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
  });
};

module.exports = errorMiddleware;