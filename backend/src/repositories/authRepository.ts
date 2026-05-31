import { pool } from "../database/postgres";
import type { AuthUser } from "../types/user";

export const findAuthUserByEmail = async (
  email: string
): Promise<AuthUser | undefined> => {
  const result = await pool.query<AuthUser>(
    "SELECT * FROM auth_users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};