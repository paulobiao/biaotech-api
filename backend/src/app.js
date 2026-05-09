const healthRoutes = require("./routes/healthRoutes");

const express = require('express');

const apiRoutes = require('./routes/apiRoutes');

const app = express();

app.use(express.json());

app.use('/', apiRoutes);

module.exports = app;
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

app.use("/api/health", healthRoutes);