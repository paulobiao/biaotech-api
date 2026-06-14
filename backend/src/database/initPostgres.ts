import bcrypt from "bcryptjs";

import { pool } from "./postgres";

const FAKE_USERS = [
  "Ana Souza",
  "Carlos Mendes",
  "Fernanda Lima",
  "Ricardo Oliveira",
  "Juliana Santos",
  "Bruno Costa",
  "Mariana Ferreira",
  "Lucas Pereira",
];

const initPostgres = async (): Promise<void> => {
  try {
    const adminUser = await pool.query(
      "SELECT id FROM auth_users WHERE email = $1",
      ["admin@biaotech.dev"]
    );

    if (adminUser.rows.length === 0) {
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminPassword) {
        throw new Error(
          "ADMIN_PASSWORD environment variable is not set. Refusing to seed admin user with a default password."
        );
      }
      const hashedPassword = bcrypt.hashSync(adminPassword, 10);

      await pool.query(
        "INSERT INTO auth_users (email, password, role) VALUES ($1, $2, $3)",
        ["admin@biaotech.dev", hashedPassword, "admin"]
      );

      console.log("✅ PostgreSQL admin user created");
    }

    const demoUser = await pool.query(
      "SELECT id FROM auth_users WHERE email = $1",
      ["demo@biaotech.dev"]
    );

    if (demoUser.rows.length === 0) {
      const hashedPassword = bcrypt.hashSync("demo1234", 10);

      await pool.query(
        "INSERT INTO auth_users (email, password, role) VALUES ($1, $2, $3)",
        ["demo@biaotech.dev", hashedPassword, "user"]
      );

      console.log("✅ PostgreSQL demo user created");
    }

    for (const name of FAKE_USERS) {
      await pool.query(
        "INSERT INTO users (name) SELECT $1 WHERE NOT EXISTS (SELECT 1 FROM users WHERE name = $1)",
        [name]
      );
    }

    console.log("✅ PostgreSQL seed completed");
  } catch (error) {
    console.error("❌ PostgreSQL seed error:", error);
  }
};

export default initPostgres;