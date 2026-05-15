const { pool } = require("./src/database/postgres");

module.exports = async () => {
  await pool.end();
};