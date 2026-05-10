const errorMiddleware = require("./middleware/errorMiddleware");

const loggerMiddleware = require("./middleware/loggerMiddleware");

const healthRoutes = require("./routes/healthRoutes");

const express = require('express');

const apiRoutes = require('./routes/apiRoutes');

const notFoundMiddleware = require("./middleware/notFoundMiddleware");

const app = express();

app.use(notFoundMiddleware);

app.use(loggerMiddleware);

app.use(express.json());

app.use('/', apiRoutes);

module.exports = app;
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

app.use("/api/health", healthRoutes);