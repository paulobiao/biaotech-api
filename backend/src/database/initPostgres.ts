import bcrypt from "bcryptjs";

import { pool } from "./postgres";

const initPostgres = async (): Promise<void> => {
  try {
    const adminUser = await pool.query(
      "SELECT * FROM auth_users WHERE email = $1",
      ["admin@biaotech.dev"]
    );

    if (adminUser.rows.length === 0) {
      const hashedPassword = bcrypt.hashSync("123456", 10);

      await pool.query(
        `
        INSERT INTO auth_users (email, password, role)
        VALUES ($1, $2, $3)
        `,
        ["admin@biaotech.dev", hashedPassword, "admin"]
      );

      console.log("✅ PostgreSQL admin user created");
    }

    console.log("✅ PostgreSQL seed completed");
  } catch (error) {
    console.error("❌ PostgreSQL seed error:", error);
  }
};

export default initPostgres;