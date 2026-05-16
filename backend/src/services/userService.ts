import { pool } from "../database/postgres";
import type { User } from "../types/user";

export const findAllUsers = async (): Promise<User[]> => {
  const result = await pool.query<User>("SELECT * FROM users ORDER BY id ASC");
  return result.rows;
};

export const findUserById = async (id: string | number): Promise<User | undefined> => {
  const result = await pool.query<User>("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const createUser = async (name: string): Promise<User> => {
  const cleanName = name.trim();

  const result = await pool.query<User>(
    "INSERT INTO users (name) VALUES ($1) RETURNING *",
    [cleanName]
  );

  return result.rows[0];
};

export const updateUser = async (
  id: string | number,
  name: string
): Promise<User | undefined> => {
  const cleanName = name.trim();

  const result = await pool.query<User>(
    "UPDATE users SET name = $1 WHERE id = $2 RETURNING *",
    [cleanName, id]
  );

  return result.rows[0];
};

export const deleteUser = async (id: string | number): Promise<User | undefined> => {
  const result = await pool.query<User>(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};