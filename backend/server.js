require("dotenv").config();
require("ts-node/register/transpile-only");

const { testConnection } = require("./src/database/postgres");

const runMigrations = require("./src/database/runMigrations");
const initPostgres = require("./src/database/initPostgres");

const app = require("./src/app");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async () => {
  await testConnection();
  await runMigrations();
  await initPostgres();

  app.listen(PORT, () => {
    console.log(`
=================================
🚀 BiaoTech API running
🌎 Environment: ${NODE_ENV}
📡 Port: ${PORT}
=================================
    `);
  });
};

startServer();