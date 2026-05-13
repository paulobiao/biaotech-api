const pool = require("./postgres");
const bcrypt = require("bcryptjs");

const initPostgres = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS auth_users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);

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

    console.log("✅ PostgreSQL tables initialized");

  } catch (error) {
    console.error("❌ PostgreSQL init error:", error);
  }
};

module.exports = initPostgres;