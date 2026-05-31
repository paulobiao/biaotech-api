import { pool } from "../database/postgres";
import type { User } from "../types/user";

interface FindUsersParams {
  page: number;
  limit: number;
  search?: string;
}

interface FindUsersDatabaseResult {
  users: User[];
  total: number;
}

export const findUsers = async ({
  page,
  limit,
  search,
}: FindUsersParams): Promise<FindUsersDatabaseResult> => {
  const offset = (page - 1) * limit;

  const values: Array<string | number> = [];
  let whereClause = "";

  if (search && search.trim() !== "") {
    values.push(`%${search.trim()}%`);
    whereClause = `WHERE name ILIKE $${values.length}`;
  }

  const countResult = await pool.query<{ total: string }>(
    `SELECT COUNT(*) AS total FROM users ${whereClause}`,
    values
  );

  values.push(limit);
  values.push(offset);

  const usersResult = await pool.query<User>(
    `
    SELECT * FROM users
    ${whereClause}
    ORDER BY id ASC
    LIMIT $${values.length - 1}
    OFFSET $${values.length}
    `,
    values
  );

  return {
    users: usersResult.rows,
    total: Number(countResult.rows[0].total),
  };
};

export const findAllUsers = async (): Promise<User[]> => {
  const result = await pool.query<User>("SELECT * FROM users ORDER BY id ASC");

  return result.rows;
};

export const findUserById = async (
  id: string | number
): Promise<User | undefined> => {
  const result = await pool.query<User>("SELECT * FROM users WHERE id = $1", [
    id,
  ]);

  return result.rows[0];
};

export const createUser = async (name: string): Promise<User> => {
  const result = await pool.query<User>(
    "INSERT INTO users (name) VALUES ($1) RETURNING *",
    [name]
  );

  return result.rows[0];
};

export const updateUser = async (
  id: string | number,
  name: string
): Promise<User | undefined> => {
  const result = await pool.query<User>(
    "UPDATE users SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );

  return result.rows[0];
};

export const deleteUser = async (
  id: string | number
): Promise<User | undefined> => {
  const result = await pool.query<User>(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};