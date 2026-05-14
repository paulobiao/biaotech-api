const fs = require("fs");
const path = require("path");
const pool = require("./postgres");

const runMigrations = async () => {
  const migrationsPath = path.join(__dirname, "../../migrations");

  const files = fs
    .readdirSync(migrationsPath)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const filePath = path.join(migrationsPath, file);
    const sql = fs.readFileSync(filePath, "utf8");

    console.log(`Running migration: ${file}`);
    await pool.query(sql);
  }

  console.log("✅ Migrations completed");
};

module.exports = runMigrations;