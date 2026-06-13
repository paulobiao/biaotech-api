import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./config/swagger";

import apiRoutes from "./routes/apiRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import healthRoutes from "./routes/healthRoutes";

import loggerMiddleware from "./middleware/loggerMiddleware";
import notFoundMiddleware from "./middleware/notFoundMiddleware";
import errorMiddleware from "./middleware/errorMiddleware";
import requestIdMiddleware from "./middleware/requestIdMiddleware";

const app = express();

const allowedOrigins = (
  process.env.CORS_ORIGIN ?? "http://localhost:5173"
)
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.set("trust proxy", 1);

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

export default app;