require("dotenv").config();

require("./src/database/postgres");

const initPostgres = require("./src/database/initPostgres");

const app = require("./src/app");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

initPostgres();

app.listen(PORT, () => {
  console.log(`
=================================
🚀 BiaoTech API running
🌎 Environment: ${NODE_ENV}
📡 Port: ${PORT}
=================================
  `);
});