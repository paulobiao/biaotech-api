import * as userRepository from "../repositories/userRepository";
import type { User } from "../types/user";

interface FindUsersParams {
  page: number;
  limit: number;
  search?: string;
}

interface FindUsersResult {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const findUsers = async ({
  page,
  limit,
  search,
}: FindUsersParams): Promise<FindUsersResult> => {
  const { users, total } = await userRepository.findUsers({
    page,
    limit,
    search,
  });

  const totalPages = Math.ceil(total / limit);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

export const findAllUsers = async (): Promise<User[]> => {
  return userRepository.findAllUsers();
};

export const findUserById = async (
  id: string | number
): Promise<User | undefined> => {
  return userRepository.findUserById(id);
};

export const createUser = async (name: string): Promise<User> => {
  const cleanName = name.trim();

  return userRepository.createUser(cleanName);
};

export const updateUser = async (
  id: string | number,
  name: string
): Promise<User | undefined> => {
  const cleanName = name.trim();

  return userRepository.updateUser(id, cleanName);
};

export const deleteUser = async (
  id: string | number
): Promise<User | undefined> => {
  return userRepository.deleteUser(id);
};