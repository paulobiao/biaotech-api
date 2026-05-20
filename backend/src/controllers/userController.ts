import type { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import { successResponse, errorResponse } from "../utils/apiResponse";
import type { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await userService.findAllUsers();

    successResponse(res, 200, "Usuários listados com sucesso", { users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const user = await userService.findUserById(id);

    if (!user) {
      errorResponse(res, 404, "Usuário não encontrado");
      return;
    }

    successResponse(res, 200, "Usuário encontrado com sucesso", { user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body as CreateUserDto;

    const user = await userService.createUser(name);

    successResponse(res, 201, "Usuário criado com sucesso", { user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body as UpdateUserDto;

    const existingUser = await userService.findUserById(id);

    if (!existingUser) {
      errorResponse(res, 404, "Usuário não encontrado");
      return;
    }

    const updatedUser = await userService.updateUser(id, name);

    successResponse(res, 200, "Usuário atualizado com sucesso", {
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      errorResponse(res, 404, "Usuário não encontrado");
      return;
    }

    successResponse(res, 200, "Usuário deletado com sucesso", {
      user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};