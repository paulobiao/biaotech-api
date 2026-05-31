import "dotenv/config";

import { testConnection } from "./src/database/postgres";
import runMigrations from "./src/database/runMigrations";
import initPostgres from "./src/database/initPostgres";
import app from "./src/app";

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async (): Promise<void> => {
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