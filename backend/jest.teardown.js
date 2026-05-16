

module.exports = async () => {
  const postgres = require("./src/database/postgres");
  await postgres.pool.end();
};