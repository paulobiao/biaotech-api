const { pool } = require("../database/postgres");
const bcrypt = require("bcryptjs");

const initPostgres = async () => {
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
    } else {
      await pool.query(
        `
        UPDATE auth_users
        SET role = $1
        WHERE email = $2
        `,
        ["admin", "admin@biaotech.dev"]
      );
    }

    console.log("✅ PostgreSQL seed completed");
  } catch (error) {
    console.error("❌ PostgreSQL seed error:", error);
  }
};

module.exports = initPostgres;