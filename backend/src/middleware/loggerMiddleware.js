const crypto = require("crypto");
const pinoHttp = require("pino-http");

const logger = require("../config/logger");

const loggerMiddleware = pinoHttp({
  logger,

  genReqId: () => {
    return crypto.randomUUID();
  },

  customLogLevel: (_req, res, err) => {
    if (res.statusCode >= 500 || err) {
      return "error";
    }

    if (res.statusCode >= 400) {
      return "warn";
    }

    return "info";
  },

  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} completed with ${res.statusCode}`;
  },

  customErrorMessage: (req, res) => {
    return `${req.method} ${req.url} failed with ${res.statusCode}`;
  },
});

module.exports = loggerMiddleware;