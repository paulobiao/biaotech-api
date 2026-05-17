const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");

const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const healthRoutes = require("./routes/healthRoutes");

const loggerMiddleware = require("./middleware/loggerMiddleware");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const requestIdMiddleware = require("./middleware/requestIdMiddleware");

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Muitas requisições. Tente novamente mais tarde.",
  },
});

app.use(helmet());
app.use(express.json());
app.use(requestIdMiddleware);
app.use(loggerMiddleware);
app.use(apiLimiter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", apiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/health", healthRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;