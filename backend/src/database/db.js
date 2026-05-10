const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");

const db = new Database("database.sqlite");

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS auth_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`).run();

const adminUser = db
  .prepare("SELECT * FROM auth_users WHERE email = ?")
  .get("admin@biaotech.dev");

if (!adminUser) {
  const hashedPassword = bcrypt.hashSync("123456", 10);

  db.prepare(`
    INSERT INTO auth_users (email, password)
    VALUES (?, ?)
  `).run("admin@biaotech.dev", hashedPassword);

  console.log("✅ Admin user created");
}

module.exports = db;