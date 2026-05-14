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
        INSERT INTO auth_users (email, password)
        VALUES ($1, $2)
        `,
        ["admin@biaotech.dev", hashedPassword]
      );

      console.log("✅ PostgreSQL admin user created");
    }

    console.log("✅ PostgreSQL seed completed");

  } catch (error) {
    console.error("❌ PostgreSQL seed error:", error);
  }
};

module.exports = initPostgres;