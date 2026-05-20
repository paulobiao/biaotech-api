import type { Request, Response, NextFunction } from "express";

import type { UserRole } from "../types/roles";

const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Usuário não autenticado",
      });

      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Acesso negado",
      });

      return;
    }

    next();
  };
};

export default authorizeRoles;