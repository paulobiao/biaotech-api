import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

const validateRequest = (schema: ZodSchema) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Erro de validação",
        errors: result.error.flatten(),
      });

      return;
    }

    next();
  };
};

export default validateRequest;