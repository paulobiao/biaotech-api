const { pool } = require("./src/database/postgres");

module.exports = async () => {
  const { pool } = require("./src/database/postgres");
  await pool.end();
};